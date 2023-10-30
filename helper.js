const dbHelper = require('./dbhelper')

async function createUser(email, username, password){
    await dbHelper.makeDbQuery('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, password]);
}

async function deleteUser(username){
    await dbHelper.makeDbQuery('DELETE FROM users WHERE username = ?', [username]);
}

async function createCategory(name){
    await dbHelper.makeDbQuery('INSERT INTO categories (name) VALUES (?)', [name]);
}

async function deleteCategory(category_id){
    await dbHelper.makeDbQuery('DELETE FROM categories WHERE category_id = ?', [category_id]);
}

async function createQuestion(category_id, question, answer, difficulty){
    await dbHelper.makeDbQuery('INSERT INTO flashcards (category_id, question, answer, difficulty) VALUES (?, ?, ?, ?)', [category_id, question, answer, difficulty]);
}

async function deleteQuestion(card_id){
    await dbHelper.makeDbQuery('DELETE FROM flashcards WHERE card_id = ?', [card_id]);
}


module.exports = {
    createUser,
    deleteUser, 
    createCategory,
    deleteCategory,
    createQuestion,
    deleteQuestion
}   