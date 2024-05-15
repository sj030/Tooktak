const { PatientRepository } = require("../db/models/patients");

class PatientService {
    static async addPatients(patients) {
        await PatientRepository.insertMany(patients);
    }
}

module.exports = { PatientService };