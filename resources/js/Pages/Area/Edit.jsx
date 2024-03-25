import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const EditArea = ({ auth, areaInfluencia }) => {
    const valoresIniciales = {
        nameAreaI: areaInfluencia.nameAreaI
    }
    const { data, errors, setData, post } = useForm(valoresIniciales);

    const submit = (e) => {
        e.preventDefault();
        post(route('areas.update', areaInfluencia));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">ACTUALIZAR AREA DE INFLUENCIA</h2>
                    <Link href={route('areas.index')}>
                        AREAS DE INFLUENCIA
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

                                    <InputLabel htmlFor="nameAreaI" value="Nombre" />
                                    <TextInput
                                        id="nameAreaI"
                                        type="text"
                                        name="nameAreaI"
                                        value={data.nameAreaI}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('nameAreaI', e.target.value)}
                                    />

                                    <InputError message={errors.nameAreaI} className="mt-2" />
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

export default EditArea