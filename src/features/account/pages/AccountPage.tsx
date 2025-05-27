// import { useState } from 'react';
// import { useForm, FormProvider } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { accountSchema, AccountFormValues } from '../utils/validationSchemas';

// import PersonalDataForm from '../components/PersonalDataForm';
// import ServicesForm from '../components/ServicesForm';
// import PortfolioForm from '../components/PortfolioForm';
// import SettingsForm from '../components/SettingsForm';

// const tabs = [
//   { label: 'Персональні дані', component: <PersonalDataForm /> },
//   { label: 'Категорія послуг', component: <ServicesForm /> },
//   { label: 'Портфоліо', component: <PortfolioForm /> },
//   { label: 'Налаштування', component: <SettingsForm /> },
// ];

// export default function AccountPage() {
//   const [activeTab, setActiveTab] = useState(0);

//   const methods = useForm<AccountFormValues>({
//     resolver: zodResolver(accountSchema),
//     mode: 'onSubmit',
//     defaultValues: {
//       photo: '',
//       about: '',
//       firstName: '',
//       lastName: '',
//       phone: '',
//       district: '',
//     },
//   });

//   const onSubmit = (data: AccountFormValues) => {
//     console.log('Submitted:', data);
//   };

//   return (
//     <FormProvider {...methods}>
//       <form
//         onSubmit={methods.handleSubmit(onSubmit)}
//         className="xl:max-w-[1200px] xl:mx-auto xl:py-12 px-4"
//       >
//         {/* Навігація вкладок */}
//         <div className="flex justify-between items-center xl:mb-8">
//           <div className="tabs tabs-boxed bg-[--color-alabaster] rounded-full overflow-hidden">
//             {tabs.map((tab, i) => (
//               <button
//                 type="button"
//                 key={i}
//                 onClick={() => setActiveTab(i)}
//                 className={`tab xl:px-6 xl:py-2 text-sm font-medium ${
//                   i === activeTab
//                     ? 'bg-[--color-fire] text-white'
//                     : 'text-[--color-fire] hover:bg-[--color-fire]/10'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           <button
//             type="submit"
//             className="btn btn-outline border-[--color-fire] text-[--color-fire] hover:bg-[--color-fire] hover:text-white transition"
//           >
//             Зберегти
//           </button>
//         </div>

//         {/* Контент вкладки */}
//         <div className="xl:border xl:rounded-xl xl:p-8 xl:bg-white">
//           {tabs[activeTab].component}
//         </div>
//       </form>
//     </FormProvider>
//   );
// }

