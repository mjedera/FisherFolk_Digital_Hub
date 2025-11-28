// src/controllers/applicantControllers.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Validation helper
function isValidName(input) {
    return /^[A-Za-z\s-]+$/.test(input);
}

// --------------------
// CREATE APPLICANT
// --------------------
exports.createApplicant = async (req, res) => {
    try {
        const {
            username,
            password,
            first_name,
            middle_name,
            last_name,
            extra_name,
            age,
            sex,
            birthdate,
            address,
            marital_status,
            applicant_type
        } = req.body;

        // Handle file upload
        let applicant_photo = null;
        if (req.file) {
            applicant_photo = `/applicant_photos/${req.file.filename}`;
        }

        // Required fields
        if (!username || !password || !first_name || !last_name) {
            return res.status(400).json({ message: "Required fields are missing." });
        }

        // Name validation
        if (!isValidName(first_name)) return res.status(400).json({ message: "First name must contain letters only." });
        if (middle_name && !isValidName(middle_name)) return res.status(400).json({ message: "Middle name must contain letters only." });
        if (!isValidName(last_name)) return res.status(400).json({ message: "Last name must contain letters only." });

        // Check duplicates
        const [rows] = await pool.execute('SELECT username FROM applicants WHERE username = ?', [username]);
        if (rows.length > 0) return res.status(409).json({ message: 'Username already exists.' });

        const [existingApplicant] = await pool.execute(
            `SELECT id FROM applicants WHERE first_name = ? AND middle_name = ? AND last_name = ?`,
            [first_name, middle_name, last_name]
        );
        if (existingApplicant.length > 0) return res.status(409).json({ message: "Applicant with the same name already exists." });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into DB
        const [result] = await pool.execute(
            `INSERT INTO applicants 
            (username, password, first_name, middle_name, last_name, extra_name, 
             age, sex, birthdate, address, marital_status, applicant_type, applicant_photo) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                username,
                hashedPassword,
                first_name,
                middle_name || null,
                last_name,
                extra_name || null,
                age || null,
                sex || null,
                birthdate || null,
                address || null,
                marital_status || null,
                applicant_type || null,
                applicant_photo
            ]
        );

        res.status(201).json({
            message: 'Applicant created successfully.',
            id: result.insertId,
            applicant_photo
        });

    } catch (error) {
        console.error('Error creating applicant:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// --------------------
// FETCH ALL APPLICANTS
// --------------------
exports.getAllApplicants = async (req, res) => {
    try {
        const [applicants] = await pool.execute(
            `SELECT id, first_name, middle_name, last_name, extra_name, age, sex, birthdate, address, marital_status, applicant_type 
             FROM applicants`
        );

        const formatted = applicants.map(a => ({
            id: a.id,
            firstname: a.first_name,
            middlename: a.middle_name,
            lastname: a.last_name,
            extraname: a.extra_name,
            age: a.age,
            sex: a.sex,
            birthdate: a.birthdate,
            address: a.address,
            status: a.marital_status,
            applicantType: a.applicant_type
        }));

        res.status(200).json(formatted);
    } catch (error) {
        console.error('Error fetching applicants:', error);
        res.status(500).json({ message: 'Server error while fetching applicants' });
    }
};

// --------------------
// FETCH SINGLE APPLICANT
// --------------------
exports.getApplicantById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.execute(
            `SELECT id, username, first_name, middle_name, last_name, extra_name, age, sex, birthdate, address, marital_status, applicant_type, applicant_photo 
             FROM applicants WHERE id = ?`,
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Applicant not found.' });
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error fetching applicant:', error);
        res.status(500).json({ message: 'Server error while fetching applicant.' });
    }
};

// --------------------
// UPDATE APPLICANT
// --------------------
exports.updateApplicant = async (req, res) => {
    const { id } = req.params;
    const {
        first_name, middle_name, last_name, extra_name, age, sex,
        birthdate, address, marital_status, applicant_type
    } = req.body;

    // Handle file upload
    let applicant_photo;
    if (req.file) applicant_photo = `/applicant_photos/${req.file.filename}`;

    const fields = [];
    const values = [];

    if (first_name !== undefined) { fields.push('first_name = ?'); values.push(first_name); }
    if (middle_name !== undefined) { fields.push('middle_name = ?'); values.push(middle_name); }
    if (last_name !== undefined) { fields.push('last_name = ?'); values.push(last_name); }
    if (extra_name !== undefined) { fields.push('extra_name = ?'); values.push(extra_name); }
    if (age !== undefined) { fields.push('age = ?'); values.push(age); }
    if (sex !== undefined) { fields.push('sex = ?'); values.push(sex); }
    if (birthdate !== undefined) { fields.push('birthdate = ?'); values.push(birthdate); }
    if (address !== undefined) { fields.push('address = ?'); values.push(address); }
    if (marital_status !== undefined) { fields.push('marital_status = ?'); values.push(marital_status); }
    if (applicant_type !== undefined) { fields.push('applicant_type = ?'); values.push(applicant_type); }
    if (applicant_photo !== undefined) { fields.push('applicant_photo = ?'); values.push(applicant_photo); }

    if (fields.length === 0) return res.status(400).json({ message: 'No fields provided for update.' });

    values.push(id);

    try {
        const sql = `UPDATE applicants SET ${fields.join(', ')} WHERE id = ?`;
        const [result] = await pool.execute(sql, values);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Applicant not found or no changes made.' });

        res.status(200).json({ message: 'Applicant updated successfully.', id });
    } catch (error) {
        console.error('Error updating applicant:', error);
        res.status(500).json({ message: 'Server error while updating applicant.' });
    }
};

// --------------------
// DELETE APPLICANT
// --------------------
exports.deleteApplicant = async (req, res) => {
    const { id } = req.params;
    let connection;

    try {
        const deleter_user_id = req.session?.userId;
        connection = await pool.getConnection();
        await connection.beginTransaction();

        if (!deleter_user_id) {
            await connection.rollback();
            return res.status(403).json({ message: 'Authorization error: Admin ID missing from session.' });
        }

        const [applicantRows] = await connection.execute(`SELECT * FROM applicants WHERE id = ?`, [id]);
        if (applicantRows.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Applicant not found.' });
        }

        const applicant = applicantRows[0];
        const deleted_at_timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

        await connection.execute(
            `INSERT INTO deleted_applicants_history 
            (applicant_id, username, password, first_name, middle_name, last_name, extra_name, age, sex, birthdate, address, marital_status, applicant_type, photo_url, created_at, deleted_by_user_id, deleted_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                applicant.id,
                applicant.username,
                applicant.password,
                applicant.first_name,
                applicant.middle_name,
                applicant.last_name,
                applicant.extra_name,
                applicant.age,
                applicant.sex,
                applicant.birthdate,
                applicant.address,
                applicant.marital_status,
                applicant.applicant_type,
                applicant.applicant_photo,
                applicant.created_at,
                deleter_user_id,
                deleted_at_timestamp
            ]
        );

        await connection.execute('DELETE FROM applicants WHERE id = ?', [id]);
        await connection.commit();

        res.status(200).json({ message: `Applicant ID ${id} deleted and archived successfully.` });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Transaction Error:', error);
        res.status(500).json({ message: 'Failed to delete and archive applicant.', error: error.message });
    } finally {
        if (connection) connection.release();
    }
};
