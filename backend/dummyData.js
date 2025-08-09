const User = require('./models/user');

const dummyUsers = [
    {
        name: 'Chamodya Rajapaksha',
        email: 'chamodya@example.com',
        password: 'password123',
        role: 'intern',
        group_id: 1
    },
    {
        name: 'Tharindu Perera',
        email: 'tharindu@example.com',
        password: 'secure456',
        role: 'group_leader',
        group_id: 1
    },
    {
        name: 'Nimal Silva',
        email: 'nimal@example.com',
        password: 'test789',
        role: 'super_leader',
        group_id: 2
    },
    {
        name: 'Kavya Fernando',
        email: 'kavya@example.com',
        password: 'kavya1010',
        role: 'intern',
        group_id: 2
    },
    {
        name: 'Sanjaya Wijesinghe',
        email: 'sanjaya@example.com',
        password: 'sanjaya2020',
        role: 'intern',
        group_id: 3
    }
];

const seedUsers = async () => {
    for (const user of dummyUsers) {
        try {
            await new Promise((resolve, reject) => {
                User.create(user, (err, result) => {
                    if (err) {
                        console.error(`Error adding ${user.email}:`, err.message);
                        return reject(err);
                    }
                    console.log(`Added ${user.email}`);
                    resolve(result);
                });
            });
        } catch (err) {
            console.error(`Failed to add ${user.email}`);
        }
    }
    console.log('All dummy users added successfully');
    process.exit(0);
};

seedUsers();