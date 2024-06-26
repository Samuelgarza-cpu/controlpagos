import { Head, Link } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { useEffect, useState } from "react"
import * as XLSX from 'xlsx';
const RegistroIndex = ({ auth, registros }) => {

    const [dataRregistros, setDataRegistros] = useState(registros);

    const handleSearch = async (e) => {
        const textSearch = e.target.value;
        const filterNombreRegistro = await registros.filter((registro) => registro.nombre.toUpperCase().includes(textSearch.toUpperCase()))
        const filterEstructura = await registros.filter((registro) => registro.estructura.nombreEstructura.toUpperCase().includes(textSearch.toUpperCase()))
        const filterRfc = await registros.filter((registro) => registro.rfc.toUpperCase().includes(textSearch.toUpperCase()))
        const filterNivel = await registros.filter((registro) => registro.nivel.nombreNivel.toUpperCase().includes(textSearch.toUpperCase()))
        const result = [];
        result.push(...filterNombreRegistro);
        result.push(...filterEstructura);
        result.push(...filterRfc);
        result.push(...filterNivel);
        const data = [...new Set(result)];
        setDataRegistros(data);


    };
    const exportExcel = () => {
        if (dataRregistros.length === 0) {
            alert('NADA QUE EXPORTAR')
            return;
        }
        dataRregistros.map((reg) => {
            reg.estructura = reg.estructura.nombreEstructura,
                reg.nivel = reg.nivel.nombreNivel,
                reg.area = reg.area.nameAreaI
            return reg;
        })
        const worksheet = XLSX.utils.json_to_sheet(dataRregistros);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1");
        XLSX.writeFile(workbook, "Registros.xlsx");

    };
    useEffect(() => { setDataRegistros(registros) }, [registros])
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
                <div className=" mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <div className="w-full md:w-1/2 mb-3">
                                    <form className="flex items-center">
                                        <label htmlFor="simple-search" className="sr-only">Search</label>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleSearch} placeholder="Search" required="" />
                                        </div>
                                        <button onClick={exportExcel} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2 ">Excel</button>

                                        {/* <button onClick={exportPdf} >EXPORTAR PDF</button> */}
                                    </form>
                                </div>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Nombre
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                RFC
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Teléfono
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
                                                Ruta
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Accion
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataRregistros?.map(registro => (

                                                <tr key={registro.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {registro.nombre}
                                                    </th>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {registro.rfc}
                                                    </th>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {registro.telefono}
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
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {registro.ruta}
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