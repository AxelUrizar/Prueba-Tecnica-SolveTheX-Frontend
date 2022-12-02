export default function authHeader() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      return { Authorization: usuario };
    } else {
      return {};
    }
}