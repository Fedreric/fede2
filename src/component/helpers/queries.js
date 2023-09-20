const uriMenus =
    import.meta.env.VITE_API_MENUS;
const uriUsuarios =
    import.meta.env.VITE_API_USUARIOS;

export const listarUsuarios = async() => {
    try {
        const respuesta = await fetch(uriUsuarios);
        const listaUsuarios = await respuesta.json();
        return listaUsuarios;
    } catch (error) {
        console.log(error);
    }
}

export const crearUsuario = async(user) => {
    try {
        const listaUsuarios = await listarUsuarios();
        let usuario = listaUsuarios.find((usuario) => usuario.email === user.email)
        if (usuario) {
            const resp = { status: 400 };
            return resp;
        } else {
            user.estado = true;
            const respuesta = await fetch(uriUsuarios, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            //en el BackEnd se enviara el correo de verificacion
            return respuesta;

        }
    } catch (error) {
        console.log(error);
    }
}

export const suspenderUsuarios = async(id, user) => {
    try {
        const respuesta = await fetch(`${uriUsuarios}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}


export const listarMenus = async() => {
    try {
        const respuesta = await fetch(uriMenus);
        const listaMenus = await respuesta.json();
        return listaMenus;
    } catch (error) {
        console.log(error);
    }
};

export const crearMenu = async(menu) => {
    try {
        menu.estado = 'pendiente';
        const respuesta = await fetch(uriMenus, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(menu)
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}

export const obtenerMenu = async(id) => {
    try {
        const respuesta = await fetch(`${uriMenus}/${id}`);
        const menu = respuesta.json();
        return menu;
    } catch (error) {
        console.log(error);
    }
}

export const editarMenu = async(id, menuEditado) => {
    try {
        menuEditado.estado = 'pendiente';
        const respuesta = await fetch(`${uriMenus}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menuEditado),
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}

export const borrarMenu = async(id) => {
    try {
        const respuesta = await fetch(`${uriMenus}/${id}`, {
            method: "DELETE"
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}