const baseURL = 'http://localhost:3000/home';
module.exports = {
    async getMyProducts(){
        try {
            const products = await fetch.get(`${baseURL}/productsList`);
            return products;
        } catch (error) {
            return error;
        }
    },
}