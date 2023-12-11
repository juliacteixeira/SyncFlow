// src/models/User.ts
import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface que representa um usuário no MongoDB.
 */
export interface IUser extends Document {
    token: string;
    username: string;
    email: string;
    password: string;
}

// Schema do usuário
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Middleware pré-save para criptografar a senha antes de salvar no banco de dados
userSchema.pre<IUser>('save', async function (next) {
    const user = this;

    // Verifica se a senha foi modificada antes de aplicar a criptografia
    if (!user.isModified('password')) return next();

    // Gera um salt e aplica a criptografia bcrypt à senha
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    next();
});

// Modelo do usuário no MongoDB
const UserModel = mongoose.model<IUser>('User', userSchema);

export { UserModel };

