import jwt from "jsonwebtoken"; // Используем import
export const secretKey = "TOTALSECRET"

export default function authentication(password){
    console.log("function authentication name:",password)
    const token = jwt.sign({ password }, secretKey)
    console.log(token)
    return token;
}

export function comparePasswords(password, extractedPassword){
    const token = jwt.sign({ password }, secretKey)
    const tokenFromExtractedPassword = jwt.sign({ password }, secretKey)
    return token === tokenFromExtractedPassword;
}