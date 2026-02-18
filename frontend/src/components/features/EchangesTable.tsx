import { useFieldArray, useFormContext } from "react-hook-form";
import { DatFormValues, defaultEchangeDonnees } from "../../types/dat";
import { Plus, Trash2, ArrowLeftRight } from "lucide-react";

export function EchangesTable() {
  const { register, control } = useFormContext<DatFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "echanges_donnees"
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E3E3FD] flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 text-[#000091]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#161616]">Échanges de Données</h3>
            <p className="text-sm text-[#666666]">Flux de données et volumétrie associée</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => append({ ...defaultEchangeDonnees })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#000091] text-white text-sm font-medium hover:bg-[#1212FF] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter un échange
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F6F6F6] border-b-2 border-[#000091]">
              <th className="px-2 py-3 text-left text-xs font-semibold text-[#161616] uppercase">Type</th>
              <th className="px-2 py-3 text-left text-xs font-semibold text-[#161616] uppercase">Brique</th>
              <th className="px-2 py-3 text-left text-xs font-semibold text-[#161616] uppercase">Source</th>
              <th className="px-2 py-3 text-left text-xs font-semibold text-[#161616] uppercase">Destination</th>
              <th className="px-2 py-3 text-left text-xs font-semibold text-[#161616] uppercase">Données</th>
              <th className="px-2 py-3 text-left text-xs font-semibold text-[#161616] uppercase">Fréquence</th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-[#161616] uppercase">HNO</th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-[#161616] uppercase w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fields.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-[#666666]">
                  Aucun échange défini
                </td>
              </tr>
            ) : (
              fields.map((field, index) => (
                <tr key={field.id} className="hover:bg-[#F6F6F6] transition-colors">
                  <td className="px-2 py-2">
                    <select
                      {...register(`echanges_donnees.${index}.type_echange`)}
                      className="w-full px-1 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-xs"
                    >
                      <option value="API REST">API REST</option>
                      <option value="Fichier">Fichier</option>
                      <option value="Message Queue">Message Queue</option>
                      <option value="Base de données">Base de données</option>
                      <option value="SFTP">SFTP</option>
                    </select>
                  </td>
                  <td className="px-2 py-2">
                    <input
                      {...register(`echanges_donnees.${index}.brique_fonctionnelle`)}
                      placeholder="Brique..."
                      className="w-full px-1 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      {...register(`echanges_donnees.${index}.source`)}
                      placeholder="Source..."
                      className="w-full px-1 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      {...register(`echanges_donnees.${index}.destination`)}
                      placeholder="Destination..."
                      className="w-full px-1 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      {...register(`echanges_donnees.${index}.type_donnees`)}
                      placeholder="Type données..."
                      className="w-full px-1 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <select
                      {...register(`echanges_donnees.${index}.frequence`)}
                      className="w-full px-1 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-xs"
                    >
                      <option value="">-</option>
                      <option value="Temps réel">Temps réel</option>
                      <option value="Horaire">Horaire</option>
                      <option value="Quotidien">Quotidien</option>
                      <option value="Hebdomadaire">Hebdomadaire</option>
                      <option value="Mensuel">Mensuel</option>
                      <option value="À la demande">À la demande</option>
                    </select>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <select
                      {...register(`echanges_donnees.${index}.hno`)}
                      className="w-full px-1 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-xs"
                    >
                      <option value="Non">Non</option>
                      <option value="Oui">Oui</option>
                    </select>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-1 text-[#CE0500] hover:bg-[#FFE9E9] rounded transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
