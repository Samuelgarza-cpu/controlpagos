import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

const CreateRegistro = ({ auth, selector }) => {
    const valoresIniciales = {
        nombre: "",
        estructura_id: "",
        area_id: "",
        nivel_id: "",
        tipo_eleccion: ""
    }
    const { data, errors, setData, post } = useForm(valoresIniciales);

    const submit = (e) => {
        e.preventDefault();
        post(route('registros.store'));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">NUEVO REGISTRO</h2>
                    <Link href={route('registros.index')}>
                        REGISTROS
                    </Link>
                </div>
            }
        >
            <Head title="Registros" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>
                                <form onSubmit={submit} className='space-y-3'>
                                    {/* NOMBRE */}
                                    <InputLabel htmlFor="nombre" value="Nombre" />
                                    <TextInput
                                        id="nombre"
                                        type="text"
                                        name="nombre"
                                        value={data.nombre}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                    />
                                    <InputError message={errors.nombre} className="mt-2" />

                                    {/* ESTRUCTURA */}

                                    <InputLabel htmlFor="estructura" value="Estructura" />
                                    <select className='w-full  border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' id='estructura' name='estructura' onChange={(e) => {
                                        e.preventDefault();
                                        setData('estructura_id', e.target.value)
                                    }} >
                                        <option disabled selected>Selecciona una Opcion.....</option>
                                        {selector.estructuras.map((estructura) =>
                                            <option key={estructura.id} value={estructura.id}>{estructura.nombreEstructura}</option>
                                        )}

                                    </select>
                                    <InputError message={errors.estructura_id} className="mt-2" />

                                    {/* NIVELES */}

                                    <InputLabel htmlFor="nivel" value="Nivel" />
                                    <select className='w-full  border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' id='nivel' name='nivel' onChange={(e) => {
                                        e.preventDefault();
                                        setData('nivel_id', e.target.value)
                                    }} >
                                        <option disabled selected>Selecciona una Opcion.....</option>
                                        {selector.niveles.map((nivel) =>
                                            <option key={nivel.id} value={nivel.id}>{nivel.nombreNivel}</option>
                                        )}

                                    </select>
                                    <InputError message={errors.nivel_id} className="mt-2" />

                                    {/* AREAS   */}

                                    <InputLabel htmlFor="area" value="Area" />
                                    <select className='w-full  border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' id='area' name='area' onChange={(e) => {
                                        e.preventDefault();
                                        setData('area_id', e.target.value)
                                    }} >
                                        <option disabled selected>Selecciona una Opcion.....</option>
                                        {selector.areas.map((area) =>
                                            <option key={area.id} value={area.id}>{area.nameAreaI}</option>
                                        )}

                                    </select>
                                    <InputError message={errors.area_id} className="mt-2" />

                                    {/* TIPO ELECCION */}
                                    <InputLabel htmlFor="tipo_eleccion" value="Tipo de eleccion" />
                                    <TextInput
                                        id="tipo_eleccion"
                                        type="text"
                                        name="tipo_eleccion"
                                        value={data.tipo_eleccion}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('tipo_eleccion', e.target.value)}
                                    />
                                    <InputError message={errors.tipo_eleccion} className="mt-2" />

                                    {/* BOTONES */}
                                    <div className='flex justify-center mt-5'>
                                        <PrimaryButton>
                                            Crear Registro
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}

export default CreateRegistro