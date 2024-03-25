import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const CreateEstructura = ({ auth }) => {
    const valoresIniciales = {
        nombreNivel: "",
        importe: ""
    }
    const { data, errors, setData, post } = useForm(valoresIniciales);

    const submit = (e) => {
        e.preventDefault();
        post(route('niveles.store'));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">NUEVO NIVEL</h2>
                    <Link href={route('niveles.index')}>
                        NIVELES
                    </Link>
                </div>
            }
        >
            <Head title="Niveles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>
                                <form onSubmit={submit} className='space-y-3'>

                                    <InputLabel htmlFor="nombreNivel" value="Nombre Nivel" />
                                    <TextInput
                                        id="nombreNivel"
                                        type="text"
                                        name="nombreNivel"
                                        value={data.nombreNivel}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('nombreNivel', e.target.value)}
                                    />

                                    <InputError message={errors.nombreNivel} className="mt-2" />

                                    <InputLabel htmlFor="importe" value="Importe" />
                                    <TextInput
                                        id="importe"
                                        type="number"
                                        name="importe"
                                        value={data.importe}
                                        className="mt-1 block w-full"

                                        onChange={(e) => setData('importe', e.target.value)}
                                    />

                                    <InputError message={errors.importe} className="mt-2" />
                                    <div className='flex justify-center mt-5'>
                                        <PrimaryButton>
                                            Crear Nivel
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

export default CreateEstructura