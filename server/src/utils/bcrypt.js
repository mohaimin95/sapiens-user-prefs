const { hash, genSalt, compare } = require('bcryptjs');

class BcryptService {
    static rounds = 12;

    static async createHash(input) {
        const salt = await genSalt(BcryptService.rounds);
        const result = await hash(input, salt);
        return result;
    }

    static async compareHash(
        plain,
        hashString,
    ) {
        return compare(plain, hashString);
    }
}

module.exports = BcryptService;
