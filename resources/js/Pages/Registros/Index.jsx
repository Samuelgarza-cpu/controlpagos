import { Head, Link } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

const RegistroIndex = ({ auth, registros }) => {
    console.log(registros);
    return (

        < AuthenticatedLayout
            user={auth.user}
            header={
                < div className='flex justify-between' >
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">REGISTROS</h2>
                    <Link href={route('registros.create')}>
                        CREAR REGISTRO
                    </Link>
                </div >
            }
        >
            <Head title="Registros" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Nombre
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Estructura
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Area de influencia
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Nivel
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Tipo de Eleccion
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Accion
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            registros?.map(registro => (

                                                <tr key={registro.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {registro.nombre}
                                                    </th>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {registro.estructura.nombreEstructura}
                                                    </th>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {registro.area.nameAreaI}
                                                    </th>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {registro.nivel.nombreNivel}
                                                    </th>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {registro.tipo_eleccion}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <div className='space-x-3'>
                                                            <Link href={route('registros.edit', [registro])}>
                                                                Editar
                                                            </Link>
                                                            <Link as="button" method='delete' href={route('registros.destroy', [registro])}>
                                                                Eliminar
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>

                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}

export default RegistroIndex