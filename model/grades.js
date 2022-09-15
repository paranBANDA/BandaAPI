const mongoose = require('mongoose');

const { Schema } = mongoose;
const gradeSchema = new Schema({
    student_id: {
        type: Number,     // 자료형
    },
    class_id: {
        type: Number,
    },
    scores: {
        type: Array,
    }
})

module.exports = mongoose.model('Grade', gradeSchema);