import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head, Link, useForm } from '@inertiajs/react';
import dayjs from 'dayjs';


const IndexPagosRevisar = ({ auth, findBeneficiaryPago }) => {
    const { post } = useForm();

    const handleClickSi = () => {

        post(route('movimientos.pagosagain', [findBeneficiaryPago]))
    }
    const handleClickNo = () => { route('movimientos.index') }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">APLICAR NUEVAMENTE PAGOS</h2>
                </div>
            }
        >
            <Head title="Pagos" />

            <div className="py-12">
                <div className=" mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className='flex justify-center'>
                        <h1>ESTOS REGISTROS YA TIENEN UN PAGO APLICADO EN ESTE DIA, ¿ QUIERES APLICAR EL PAGO NUEVAMENTE ?</h1>
                    </div>
                    <div className='flex justify-center space-x-2'>
                        <PrimaryButton onClick={handleClickSi}>
                            SI
                        </PrimaryButton>
                        <DangerButton onClick={handleClickNo}>
                            <Link href={route('movimientos.index')}>
                                NO
                            </Link>
                        </DangerButton>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" p-6 text-gray-900">

                            <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
                                {findBeneficiaryPago && findBeneficiaryPago.map((registro) => (
                                    <li key={registro.id} className="flex items-center space-x-3 rtl:space-x-reverse">
                                        <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                        </svg>
                                        <span>{registro.nombre} - {dayjs(registro.created_at).format('YYYY - MM - DD')}</span>
                                    </li>
                                ))}


                            </ul>

                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout >

    )
}

export default IndexPagosRevisar