import { useFieldArray, useFormContext } from "react-hook-form";
import { DatFormValues } from "../../types/dat";
import { Plus, Trash2, Users } from "lucide-react";

export const ActorsTable = () => {
    const { register, control } = useFormContext<DatFormValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "acteurs",
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2 text-gray-700">
                    <Users size={20} className="text-indigo-500" /> Intervenants et Droits
                </h3>
                <button
                    type="button"
                    onClick={() => append({ acteur: "", role: "", droits: "", commentaires: "" })}
                    className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 hover:bg-indigo-700 transition"
                >
                    <Plus size={14} /> Ajouter un acteur
                </button>
            </div>

            <div className="border rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="p-3 border-b text-left">Acteur / Équipe</th>
                            <th className="p-3 border-b text-left">Rôle</th>
                            <th className="p-3 border-b text-left">Droits (Lecture/Écrit)</th>
                            <th className="p-3 border-b text-center w-16">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {fields.map((field, index) => (
                            <tr key={field.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-2">
                                    <input {...register(`acteurs.${index}.acteur`)} placeholder="ex: Équipe Exploitation" className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-indigo-100" />
                                </td>
                                <td className="p-2">
                                    <input {...register(`acteurs.${index}.role`)} placeholder="ex: Supervision" className="w-full p-2 border rounded outline-none" />
                                </td>
                                <td className="p-2">
                                    <input {...register(`acteurs.${index}.droits`)} placeholder="ex: Admin complet" className="w-full p-2 border rounded outline-none" />
                                </td>
                                <td className="p-2 text-center">
                                    <button type="button" onClick={() => remove(index)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};