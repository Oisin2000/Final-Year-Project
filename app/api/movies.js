import client from '/client';

const getMovies = () => client.get('/movies');

export default {
    getMovies
}
