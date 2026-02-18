import { useFieldArray, useFormContext } from "react-hook-form";
import { DatFormValues, defaultActeur } from "../../types/dat";
import { Plus, Trash2, Users } from "lucide-react";

export function ActorsTable() {
  const { register, control } = useFormContext<DatFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "acteurs"
  });

  return (
    <div className="space-y-4">
      {/* En-tête de section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E3E3FD] flex items-center justify-center">
            <Users className="w-5 h-5 text-[#000091]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#161616]">Acteurs du système</h3>
            <p className="text-sm text-[#666666]">Définissez les acteurs et leurs rôles</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => append({ ...defaultActeur })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#000091] text-white text-sm font-medium hover:bg-[#1212FF] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter un acteur
        </button>
      </div>

      {/* Table des acteurs */}
      <div className="overflow-x-auto border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F6F6F6] border-b-2 border-[#000091]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider w-1/4">
                Acteur / Équipe
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider w-1/4">
                Rôle
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider w-1/5">
                Droits
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider w-1/4">
                Commentaires
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-[#161616] uppercase tracking-wider w-16">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fields.map((field, index) => (
              <tr key={field.id} className="hover:bg-[#F6F6F6] transition-colors">
                <td className="px-4 py-2">
                  <input
                    {...register(`acteurs.${index}.acteur`)}
                    placeholder="Ex: Équipe Développement"
                    className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    {...register(`acteurs.${index}.role`)}
                    placeholder="Ex: Développement"
                    className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                  />
                </td>
                <td className="px-4 py-2">
                  <select
                    {...register(`acteurs.${index}.droits`)}
                    className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm appearance-none cursor-pointer"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Admin">Admin</option>
                    <option value="Lecture/Écriture">Lecture/Écriture</option>
                    <option value="Lecture seule">Lecture seule</option>
                    <option value="Exécution">Exécution</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    {...register(`acteurs.${index}.commentaires`)}
                    placeholder="Notes..."
                    className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className="p-2 text-[#CE0500] hover:bg-[#FFE9E9] rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hint */}
      <p className="text-xs text-[#666666]">
        Ajoutez tous les acteurs (personnes, équipes, systèmes) qui interagiront avec l'application.
      </p>
    </div>
  );
}
