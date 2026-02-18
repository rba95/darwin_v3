import { useFieldArray, useFormContext } from "react-hook-form";
import { DatFormValues, defaultDependanceExterne, defaultDependanceAppExterne } from "../../types/dat";
import { Plus, Trash2, Link2, ExternalLink } from "lucide-react";

export function DependancesTable() {
  const { register, control } = useFormContext<DatFormValues>();
  
  const extDeps = useFieldArray({
    control,
    name: "dependances_externes"
  });

  const appDeps = useFieldArray({
    control,
    name: "dependance_app_externes"
  });

  return (
    <div className="space-y-8">
      {/* Dépendances externes sur mon application */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E3E3FD] flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-[#000091]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#161616]">Dépendances externes sur mon application</h3>
              <p className="text-sm text-[#666666]">Systèmes externes qui dépendent de votre application</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => extDeps.append({ ...defaultDependanceExterne })}
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider w-1/2">
                  Dépendance
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">
                  Impact sur mon application
                </th>
                <th className="px-4 py-3 text-center w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {extDeps.fields.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-[#666666]">
                    Aucune dépendance externe définie
                  </td>
                </tr>
              ) : (
                extDeps.fields.map((field, index) => (
                  <tr key={field.id} className="hover:bg-[#F6F6F6] transition-colors">
                    <td className="px-4 py-2">
                      <input
                        {...register(`dependances_externes.${index}.dependance`)}
                        placeholder="Ex: Service d'authentification SSO"
                        className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        {...register(`dependances_externes.${index}.impact`)}
                        placeholder="Ex: Authentification impossible si indisponible"
                        className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => extDeps.remove(index)}
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

      {/* Dépendances de mon application sur des services externes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFE9E6] flex items-center justify-center">
              <Link2 className="w-5 h-5 text-[#B34000]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#161616]">Dépendances de mon application sur des services externes</h3>
              <p className="text-sm text-[#666666]">Services externes dont votre application dépend</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => appDeps.append({ ...defaultDependanceAppExterne })}
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider w-1/2">
                  Mon Application
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">
                  Impact sur d'autres applications
                </th>
                <th className="px-4 py-3 text-center w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appDeps.fields.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-[#666666]">
                    Aucune dépendance définie
                  </td>
                </tr>
              ) : (
                appDeps.fields.map((field, index) => (
                  <tr key={field.id} className="hover:bg-[#F6F6F6] transition-colors">
                    <td className="px-4 py-2">
                      <input
                        {...register(`dependance_app_externes.${index}.name_application`)}
                        placeholder="Ex: Module de notification"
                        className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        {...register(`dependance_app_externes.${index}.description_impact`)}
                        placeholder="Ex: Notifications non envoyées si indisponible"
                        className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => appDeps.remove(index)}
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
    </div>
  );
}
