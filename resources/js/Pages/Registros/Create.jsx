import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Tesseract, { createWorker } from 'tesseract.js';

const CreateRegistro = ({ auth, selector }) => {
    const valoresIniciales = {
        nombre: "",
        rfc: "",
        telefono: "",
        estructura_id: "",
        area_id: "",
        nivel_id: "",
        tipo_eleccion: "",
        ruta: ""
    }
    const { data, errors, setData, post } = useForm(valoresIniciales);
    const [imagen, setImagen] = useState("");
    const [textoFrontal, setTextoFrontal] = useState("");

    const submit = (e) => {
        e.preventDefault();
        post(route('registros.store'));
    }

    const handleFrontal = (e) => {
        setImagen(URL.createObjectURL(e.target.files[0]));
    }
    const handleClick = async () => {

        const worker = await createWorker('spa');
        const ret = await worker.recognize(imagen);
        setTextoFrontal(ret.data.text);
        await worker.terminate();
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
                            {/* <div className='grid grid-cols-4 gap-x-6 mb-6 '>
                                <div className="sm:col-span-1">
                                    <InputLabel htmlFor="frontal" value="FRONTAL" />
                                    <TextInput
                                        id="frontal"
                                        type="file"
                                        name="frontal"
                                        accept="image/*"
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleFrontal(e)}

                                    />
                                    <InputError message={errors.reverso} className="mt-2" />
                                </div>
                                <div className='sm:col-span-1'>
                                    <img src={imagen} width={70} alt="frontal" srcset="" />
                                </div>
                                <div className="sm:col-span-1">
                                    <InputLabel htmlFor="reverso" value="REVERSO" />
                                    <TextInput
                                        id="reverso"
                                        type="file"
                                        name="reverso"
                                        className="mt-1 block w-full"

                                    />
                                    <InputError message={errors.reverso} className="mt-2" />
                                </div>
                            </div> */}
                            {/* <button onClick={handleClick} style={{ height: 50 }}> convert to text</button> */}
                            <div className="text-box">
                                <p> {textoFrontal} </p>
                            </div>
                            <form onSubmit={submit} className='space-y-3'>
                                {/* NOMBRE */}
                                <div className=' grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                    <div className="sm:col-span-2">
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
                                    </div>
                                    <div className="sm:col-span-2">
                                        <InputLabel htmlFor="rfc" value="RFC" />
                                        <TextInput
                                            id="rfc"
                                            type="text"
                                            placeholder='ASDF010203'
                                            name="rfc"
                                            value={data.rfc}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('rfc', e.target.value)}
                                        />
                                        <InputError message={errors.rfc} className="mt-2" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <InputLabel htmlFor="rfc" value="Teléfono" />
                                        <TextInput
                                            id="telefono"
                                            type="text"
                                            name="telefono"
                                            value={data.telefono}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('telefono', e.target.value)}
                                        />
                                        <InputError message={errors.telefono} className="mt-2" />

                                    </div>
                                </div>
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
                                <div className=' grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                    <div className="sm:col-span-3">
                                        <InputLabel htmlFor="tipo_eleccion" value="Tipo de Elección" />
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
                                    </div>
                                    <div className="sm:col-span-3">
                                        <InputLabel htmlFor="ruta" value="Ruta" />
                                        <TextInput
                                            id="ruta"
                                            type="text"
                                            name="ruta"
                                            value={data.ruta}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('ruta', e.target.value)}
                                        />
                                        <InputError message={errors.ruta} className="mt-2" />
                                    </div>
                                </div>
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
        </AuthenticatedLayout >
    )
}

export default CreateRegistro