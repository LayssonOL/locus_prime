const User = (sequelize: any, DataTypes: any) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        balance: DataTypes.FLOAT,
    });

    return User;
}

export default User;