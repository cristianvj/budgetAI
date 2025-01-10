import Image from 'next/image';

const testimonials = [
  {
    name: 'María González',
    role: 'Emprendedora',
    image: '/placeholder.svg?height=100&width=100',
    quote: 'FinanzIA ha transformado la manera en que manejo mis finanzas personales y las de mi negocio. Las recomendaciones personalizadas son increíblemente útiles.'
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Profesional independiente',
    image: '/placeholder.svg?height=100&width=100',
    quote: 'Gracias a FinanzIA, he podido ahorrar más de lo que pensaba posible. La visualización de datos hace que sea fácil entender mis patrones de gasto.'
  },
  {
    name: 'Ana Martínez',
    role: 'Estudiante universitaria',
    image: '/placeholder.svg?height=100&width=100',
    quote: 'Como estudiante, gestionar mis finanzas siempre fue un desafío. FinanzIA me ha ayudado a crear un presupuesto realista y a mantenerme en el camino correcto.'
  }
];

export default function Testimonials() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Descubre cómo FinanzIA está ayudando a personas reales a mejorar su salud financiera
          </p>
        </div>
        <div className="mt-12 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <Image
                    className="h-12 w-12 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <div className="mt-4 text-gray-600 italic">&quot;{testimonial.quote}&quot;</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

