import { useFieldArray, useFormContext } from "react-hook-form";
import { DatFormValues } from "../../types/dat"; // Pas de .ts ici
// Pas de .ts ici
import { Plus, Trash2, Server } from "lucide-react";

export const VMTable = () => {
    const { register, control } = useFormContext<DatFormValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "vms",
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2 text-gray-700">
                    <Server size={20} /> Inventaire des VMs
                </h3>
                <button type="button" onClick={() => append({ environnement: "Prod", nom: "", resilience: "", role: "", os: "", cpu: 1, ram: 1 })}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
                    <Plus size={14} /> Ajouter
                </button>
            </div>
            <table className="w-full border text-sm">
                <thead className="bg-gray-50 text-gray-600">
                    <tr>
                        <th className="p-2 border">Nom</th>
                        <th className="p-2 border">CPU</th>
                        <th className="p-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field, index) => (
                        <tr key={field.id}>
                            <td className="p-1 border"><input {...register(`vms.${index}.nom`)} className="w-full p-1 outline-none" placeholder="ex: SRV-APP" /></td>
                            <td className="p-1 border"><input {...register(`vms.${index}.cpu`)} type="number" className="w-full p-1 outline-none" /></td>
                            <td className="p-1 border text-center">
                                <button type="button" onClick={() => remove(index)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};