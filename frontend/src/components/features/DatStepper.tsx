import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { DatFormValues } from '../../types/dat';
import { downloadDat } from '../../api/client';
import { ChevronRight, ChevronLeft, Save, Layout, ShieldCheck, Activity } from 'lucide-react';
import { VMTable } from "./VMTable";
import { ActorsTable } from "./ActorsTable"; // Assure-toi que ce fichier existe !

const STEPS = [
    { id: 1, label: 'Général' },
    { id: 2, label: 'Acteurs' },
    { id: 3, label: 'Architecture' },
    { id: 4, label: 'Infrastructure' },
    { id: 5, label: 'Cycle de vie' },
    { id: 6, label: 'Validation' }
];

export const DatStepper = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const methods = useForm<DatFormValues>({
        defaultValues: {
            vms: [],
            acteurs: [{ acteur: '', role: '', droits: '' }]
        }
    });

    const onSubmit = async (data: DatFormValues) => {
        try {
            const blob = await downloadDat(data);
            // ... reste du code de téléchargement ...
        } catch (e: any) {
            // Si le serveur répond avec une erreur (comme la 422)
            if (e.response) {
                console.error("Détails de l'erreur 422 :", e.response.data.detail);
                alert(`Erreur de données (422) : Certains champs sont mal remplis ou manquants.`);
            } else {
                alert("Erreur réseau : Vérifiez que le Backend est lancé.");
            }
        }
    };

    const next = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length));
    const prev = () => setCurrentStep((s) => Math.max(s - 1, 1));

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 mt-10 overflow-hidden">
            {/* Header du Stepper */}
            <div className="bg-gray-50 p-6 border-b flex justify-between">
                {STEPS.map(s => (
                    <div key={s.id} className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${currentStep === s.id ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-500'
                            }`}>
                            {s.id}
                        </div>
                        <span className={`text-[10px] uppercase font-bold ${currentStep === s.id ? 'text-blue-600' : 'text-gray-400'}`}>
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="p-10">

                    {/* ÉTAPE 1 : INFOS GÉNÉRALES */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                            <h2 className="text-2xl font-bold text-gray-800">1. Informations Projet</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-600">Titre du Projet</label>
                                    <input {...methods.register("titre_projet")} placeholder="ex: Projet DARWIN" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-600">Chef de Projet</label>
                                    <input {...methods.register("chef_projet")} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600">Objet du Document</label>
                                <textarea {...methods.register("objet_document")} rows={3} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 2 : ACTEURS (Le bloc que tu voulais rajouter) */}
                    {currentStep === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="border-l-4 border-indigo-500 pl-4">
                                <h2 className="text-2xl font-bold text-gray-800">2. Gestion des Acteurs</h2>
                                <p className="text-gray-500 text-sm">Définissez les rôles et les niveaux d'accès pour chaque intervenant.</p>
                            </div>
                            <ActorsTable />
                        </div>
                    )}

                    {/* ÉTAPE 3 : ARCHITECTURE */}
                    {currentStep === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Layout /> 3. Architecture</h2>
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-gray-600">Description de l'architecture technique</label>
                                <textarea {...methods.register("description_architecture")} rows={6} className="w-full p-3 border rounded-lg" placeholder="Décrivez ici l'agencement des composants..." />
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 4 : INFRASTRUCTURE (VMS) */}
                    {currentStep === 4 && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <VMTable />
                        </div>
                    )}

                    {/* ÉTAPE 5 : CYCLE DE VIE */}
                    {currentStep === 5 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Activity /> 5. Cycle de Vie</h2>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600">Supervision</label>
                                    <textarea {...methods.register("supervision")} className="w-full p-3 border rounded-lg" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600">Sauvegarde et Restauration</label>
                                    <textarea {...methods.register("sauvegarde_restauration")} className="w-full p-3 border rounded-lg" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 6 : VALIDATION */}
                    {currentStep === 6 && (
                        <div className="text-center space-y-6 py-10 animate-in zoom-in-95">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                <ShieldCheck size={48} />
                            </div>
                            <h2 className="text-2xl font-bold">Document prêt à être généré</h2>
                            <p className="text-gray-500">Cliquez sur le bouton ci-dessous pour créer votre dossier d'architecture technique au format Word.</p>
                        </div>
                    )}

                    {/* Boutons de Navigation */}
                    <div className="mt-12 flex justify-between border-t pt-8">
                        <button
                            type="button"
                            onClick={prev}
                            disabled={currentStep === 1}
                            className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-20 transition-all font-medium text-gray-600"
                        >
                            <ChevronLeft size={20} /> Précédent
                        </button>

                        {currentStep < STEPS.length ? (
                            <button
                                type="button"
                                onClick={next}
                                className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all font-bold"
                            >
                                Suivant <ChevronRight size={20} />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-10 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 font-bold transition-all"
                            >
                                <Save size={20} /> Générer le DAT
                            </button>
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};