import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const CreateImagen = ({ auth }) => {
    const valoresIniciales = {
        nombre: "",
        ruta: "",
        anime: ""
    }
    const { data, errors, setData, post } = useForm(valoresIniciales);

    const submit = (e) => {
        e.preventDefault();
        post(route('img.store'));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">CREAR Imagen</h2>
                    <Link href={route('img.index')}>
                        Imagenes
                    </Link>
                </div>
            }
        >
            <Head title="Imagenes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>
                                <form onSubmit={submit} className='space-y-3'>

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

                                    <InputLabel htmlFor="ruta" value="Ruta" />
                                    <TextInput
                                        id="ruta"
                                        type="file"
                                        name="ruta"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('ruta', e.target.files[0])}
                                    />

                                    <InputError message={errors.ruta} className="mt-2" />

                                    <InputLabel htmlFor="anime" value=" " />
                                    <select name='' id='anime' onChange={(e) => { setData('anime', e.target.value) }}>
                                        <option value='0' >Selecicona una Opcion</option>
                                        <option value="si">SI</option>
                                        <option value="no">NO</option>
                                    </select>

                                    <InputError message={errors.anime} className="mt-2" />
                                    <div className='flex justify-center mt-5'>
                                        <PrimaryButton>
                                            Guardar Imagen
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default CreateImagen