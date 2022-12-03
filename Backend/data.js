import bcrypt from 'bcryptjs';

const data = {
  usuarios: [
    {
      nombre: 'Victor',
      email: 'empleado01@gmail.com',
      password: bcrypt.hashSync('12345'),
      empleado: true,
    },
    {
      nombre: 'Edinson',
      email: 'usuario01@gmail.com',
      password: bcrypt.hashSync('12345'),
      empleado: false,
    },
  ],
  productos: [
    {
      /* _id: '1', */
      nombre: 'NIKE Camiseta pequeña',
      ficha: 'nike-camiseta-pequeña',
      category: 'camisetas',
      imagen: '/images/p1.jpg',
      precio: 70000,
      enInventario: 10,
      marca: 'NIKE',
      puntaje: 4.5,
      reviews: 12,
      descripcion: 'Camiseta de alta calidad',
    },
    {
      /* _id: '2', */
      nombre: 'Adidas camiseta deportiva',
      ficha: 'adidas-camiseta-deportiva',
      category: 'camisetas',
      imagen: '/images/p2.jpg',
      precio: 60000,
      enInventario: 20,
      marca: 'Adidas',
      puntaje: 4.0,
      reviews: 10,
      descripcion: 'Camiseta de alta calidad',
    },
    {
      /* _id: '3', */
      nombre: 'NIKE pantaloneta pequeña',
      ficha: 'nike-pantaloneta-pequeña',
      category: 'pantalonetas',
      imagen: '/images/p3.jpg',
      precio: 45000,
      enInventario: 15,
      marca: 'NIKE',
      puntaje: 4.5,
      reviews: 14,
      descripcion: 'Pantaloneta de alta calidad',
    },
    {
      /* _id: '4', */
      nombre: 'Adidas pantaloneta pequeña',
      ficha: 'adidas-pantaloneta-pequeña',
      category: 'pantalonetas',
      imagen: '/images/p4.jpg',
      precio: 35000,
      enInventario: 0,
      marca: 'Adidas',
      puntaje: 3.3,
      reviews: 13,
      descripcion: 'Pantaloneta de alta calidad',
    },
  ],
};
export default data;
