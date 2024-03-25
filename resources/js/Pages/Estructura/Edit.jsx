import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const EditEstructura = ({ auth, estructura }) => {
    const valoresIniciales = {
        nombreEstructura: estructura.nombreEstructura
    }
    const { data, errors, setData, post } = useForm(valoresIniciales);

    const submit = (e) => {
        e.preventDefault();
        post(route('estructuras.update', estructura));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">ACTUALIZAR ESTRUCTURA</h2>
                    <Link href={route('estructuras.index')}>
                        ESTRUCTURAS
                    </Link>
                </div>
            }
        >
            <Head title="Areas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>
                                <form onSubmit={submit} className='space-y-3'>

                                    <InputLabel htmlFor="nombreEstructura" value="Nombre" />
                                    <TextInput
                                        id="nombreEstructura"
                                        type="text"
                                        name="nombreEstructura"
                                        value={data.nombreEstructura}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('nombreEstructura', e.target.value)}
                                    />

                                    <InputError message={errors.nombreEstructura} className="mt-2" />
                                    <div className='flex justify-center mt-5'>
                                        <PrimaryButton>
                                            Actualizar Area
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

export default EditEstructura