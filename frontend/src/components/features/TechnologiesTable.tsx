import { useFieldArray, useFormContext } from "react-hook-form";
import { DatFormValues, defaultChoixTechnologique } from "../../types/dat";
import { Plus, Trash2, Cpu } from "lucide-react";

export function TechnologiesTable() {
  const { register, control } = useFormContext<DatFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choix_technologiques"
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E3E3FD] flex items-center justify-center">
            <Cpu className="w-5 h-5 text-[#000091]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#161616]">Choix Technologiques</h3>
            <p className="text-sm text-[#666666]">Technologies et versions utilisées</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => append({ ...defaultChoixTechnologique })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#000091] text-white text-sm font-medium hover:bg-[#1212FF] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F6F6F6] border-b-2 border-[#000091]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider w-1/3">
                Tiers / Brique Métier
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider w-1/3">
                Produit / Composant
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider w-1/4">
                Version
              </th>
              <th className="px-4 py-3 text-center w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fields.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[#666666]">
                  Aucun choix technologique défini
                </td>
              </tr>
            ) : (
              fields.map((field, index) => (
                <tr key={field.id} className="hover:bg-[#F6F6F6] transition-colors">
                  <td className="px-4 py-2">
                    <input
                      {...register(`choix_technologiques.${index}.tiers`)}
                      placeholder="Ex: Backend"
                      className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      {...register(`choix_technologiques.${index}.produit`)}
                      placeholder="Ex: Node.js"
                      className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      {...register(`choix_technologiques.${index}.version`)}
                      placeholder="Ex: 20.x LTS"
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
