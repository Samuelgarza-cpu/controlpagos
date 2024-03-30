import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const IndexMovimientos = ({ auth, selector, flash }) => {
    // const { flash } = usePage().props
    const [alertShow, setAlertShow] = useState(false);
    const [confirmingApplyPayments, SetConfirmingApplyPayments] = useState(false);

    useEffect(() => {
        if (flash.message == 'PAGO APLICADO' || flash.message == 'NADA QUE APLICAR') {
            setTimeout(() => {
                setAlertShow(false)
            }, 2000);
            setAlertShow(true);
        } else if (flash.message == 'YA HAY PAGOS') {
            SetConfirmingApplyPayments(true);

        }
    }, [flash.message])

    const valoresIniciales = {
        nombre: "",
        estructura_id: "",
        area_id: "",
        nivel_id: "",

    }
    const { data, errors, setData, post } = useForm(valoresIniciales);

    const submit = (e) => {
        e.preventDefault();
        post(route('movimientos.store'));
    }
    const handlePago = () => {
        const dataAll = [];
        dataAll.push(selector.resultados)
        post(route('movimientos.pagos', dataAll));
    }
    const closeModal = () => {
        SetConfirmingApplyPayments(false);

    };
    const confirmPayments = () => {
        SetConfirmingApplyPayments(true);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">MOVIMIENTOS</h2>
                    {/* <Link href={route('registros.index')}>
                        REGISTROS
                    </Link> */}
                </div>
            }
        >
            <Head title="Movimientos" />

            <div className="py-12">
                <div className=" mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className='flex justify-center'>
                        <Transition
                            show={alertShow}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-xl text-gray-600">{flash.message}</p>
                        </Transition>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" p-6 text-gray-900">
                            <form onSubmit={submit} className='space-y-3'>
                                <div className=' grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                    <div className="sm:col-span-1">
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
                                    </div>
                                    <div className="sm:col-span-1">
                                        {/* ESTRUCTURA */}

                                        <InputLabel htmlFor="estructura" value="Estructura" />
                                        <select className=' border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' id='estructura' name='estructura' onChange={(e) => {
                                            e.preventDefault();
                                            setData('estructura_id', e.target.value)
                                        }} >
                                            <option value="" selected>Selecciona una Opcion.....</option>
                                            {selector.estructuras.map((estructura) =>
                                                <option key={estructura.id} value={estructura.id}>{estructura.nombreEstructura}</option>
                                            )}

                                        </select>
                                        <InputError message={errors.estructura_id} className="mt-2" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        {/* NIVELES */}

                                        <InputLabel htmlFor="nivel" value="Nivel" />
                                        <select className=' border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' id='nivel' name='nivel' onChange={(e) => {
                                            e.preventDefault();
                                            setData('nivel_id', e.target.value)
                                        }} >
                                            <option value="" selected>Selecciona una Opcion.....</option>
                                            {selector.niveles.map((nivel) =>
                                                <option key={nivel.id} value={nivel.id}>{nivel.nombreNivel}</option>
                                            )}

                                        </select>
                                        <InputError message={errors.nivel_id} className="mt-2" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        {/* AREAS   */}

                                        <InputLabel htmlFor="area" value="Area" />
                                        <select className=' border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' id='area' name='area' onChange={(e) => {
                                            e.preventDefault();
                                            setData('area_id', e.target.value)
                                        }} >
                                            <option value="" selected>Selecciona una Opcion.....</option>
                                            {selector.areas.map((area) =>
                                                <option key={area.id} value={area.id}>{area.nameAreaI}</option>
                                            )}

                                        </select>
                                        <InputError message={errors.area_id} className="mt-2" />

                                    </div>

                                    < div className="sm:col-span-2 flex justify-center space-x-3 ">
                                        <PrimaryButton>
                                            BUSCAR
                                        </PrimaryButton>
                                    </div>
                                    {/* BOTONES */}

                                </div>
                            </form>
                            < div className="sm:col-span-2 flex justify-center absolute top-24 right-28  h-16 mt-14">
                                <PrimaryButton onClick={handlePago}>
                                    PAGAR
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
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
                                        Nivel
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Area
                                    </th>
                                    {/* <th scope="col" className="px-6 py-3">
                                        Accion
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selector.resultados && selector.resultados.map(resultado => (
                                        <tr key={resultado.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {resultado.nombre}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {resultado.estructura.nombreEstructura}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {resultado.nivel.nombreNivel}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {resultado.area.nameAreaI}
                                            </th>


                                        </tr>

                                    ))
                                }

                            </tbody>
                        </table>

                    </div>
                </div>
            </div >
            {/* <DangerButton onClick={confirmPayments}>VALIDAR MODAL</DangerButton> */}
            <Modal show={confirmingApplyPayments} onClose={closeModal}>
                <form className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        ¿Estás seguro de que quieres procesar los pagos?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        ESTOS USUARIOS YA TIENEN PAGOS APLICADOS EN ESTE DIA.
                    </p>

                    <div className="mt-6">

                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>

                        <DangerButton onClick={handlePago} className="ms-3" >
                            APLICAR PAGOS
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout >

    )
}

export default IndexMovimientos