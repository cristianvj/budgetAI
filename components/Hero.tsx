'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const budgetData = [
  { category: 'Vivienda', presupuesto: 1000, gastado: 950 },
  { category: 'Alimentación', presupuesto: 500, gastado: 480 },
  { category: 'Transporte', presupuesto: 200, gastado: 180 },
  { category: 'Entretenimiento', presupuesto: 150, gastado: 200 },
  { category: 'Ahorro', presupuesto: 300, gastado: 250 },
];

const expensesByCategoryData = [
  { category: 'Vivienda', value: 950 },
  { category: 'Alimentación', value: 480 },
  { category: 'Transporte', value: 180 },
  { category: 'Entretenimiento', value: 200 },
  { category: 'Ahorro', value: 250 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];


export default function Hero() {
  const router = useRouter();

  const handleLogin = () => router.push('/sign-in');
  
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Optimiza tus Finanzas con <span className="text-green-600">IA</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Descubre el poder de la inteligencia artificial para mejorar tu salud financiera y alcanzar tus metas económicas.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button variant="default" size="lg" onClick={handleLogin}>Comienza Ahora</Button>
          </div>
        </div>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tu Dashboard Financiero</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Presupuesto vs Gastos</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="presupuesto" fill="#3b82f6" />
                    <Bar dataKey="gastado" fill="#93c5fd" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-80">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Gastos por Categoría</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensesByCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="category"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {expensesByCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

