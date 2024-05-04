const { PatientModel } = require('../db/models/patients');

class PatientRepository {
    static async addPatient(patientData) {
        try {
            const newPatient = await Patients.create(patientData);
            if (!newPatient) {
                return JSON.stringify({
                    status: 400,
                    message: "Required Valid JSON"
                });
            } else {
                return JSON.stringify({
                    status: 200,
                    data: newPatient
                });
            }
        } catch (error) {
            return JSON.stringify({
                status: 500,
                message: error.message
            });
        }
    }
}

module.exports = { PatientRepository };