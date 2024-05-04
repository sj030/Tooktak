const { PatientRepository } = require('../db/models/patients');

class PatientService {
    static async addPatient(req, res) {
        const patientData = req.body;
        const result = JSON.parse(await PatientRepository.addPatient(patientData));
        switch (result.status) {
            case 200:
                res.status(200).send(result.data);
                break;
            case 400:
                res.status(400).send(result.message);
                break;
            case 500:
                res.status(500).send(result.message);
                break;
        }
    }
}

module.exports = { PatientService };