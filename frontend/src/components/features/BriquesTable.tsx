import { useFieldArray, useFormContext } from "react-hook-form";
import { DatFormValues, defaultBriqueFonctionnelle } from "../../types/dat";
import { Plus, Trash2, Layers } from "lucide-react";

export function BriquesTable() {
  const { register, control } = useFormContext<DatFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "briques_fonctionnelles"
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E3E3FD] flex items-center justify-center">
            <Layers className="w-5 h-5 text-[#000091]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#161616]">Briques Fonctionnelles</h3>
            <p className="text-sm text-[#666666]">Composants fonctionnels de l'application</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => append({ ...defaultBriqueFonctionnelle })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#000091] text-white text-sm font-medium hover:bg-[#1212FF] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter une brique
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F6F6F6] border-b-2 border-[#000091]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider w-1/3">
                Brique Fonctionnelle
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">
                Description / Applicatif
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-[#161616] uppercase tracking-wider w-16">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fields.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-[#666666]">
                  Aucune brique fonctionnelle définie. Cliquez sur "Ajouter une brique" pour commencer.
                </td>
              </tr>
            ) : (
              fields.map((field, index) => (
                <tr key={field.id} className="hover:bg-[#F6F6F6] transition-colors">
                  <td className="px-4 py-2">
                    <input
                      {...register(`briques_fonctionnelles.${index}.brique`)}
                      placeholder="Ex: Module Authentification"
                      className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      {...register(`briques_fonctionnelles.${index}.description`)}
                      placeholder="Description de la brique..."
                      className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-[#CE0500] hover:bg-[#FFE9E9] rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
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
