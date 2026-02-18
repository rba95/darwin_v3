import { useFieldArray, useFormContext } from "react-hook-form";
import { DatFormValues, defaultVM } from "../../types/dat";
import { Plus, Trash2, Server } from "lucide-react";

export function VMTable() {
  const { register, control } = useFormContext<DatFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "vms"
  });

  return (
    <div className="space-y-4">
      {/* En-tête de section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E3E3FD] flex items-center justify-center">
            <Server className="w-5 h-5 text-[#000091]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#161616]">Machines Virtuelles</h3>
            <p className="text-sm text-[#666666]">Configuration des VMs nécessaires</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => append({ ...defaultVM })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#000091] text-white text-sm font-medium hover:bg-[#1212FF] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter une VM
        </button>
      </div>

      {/* Table des VMs */}
      <div className="overflow-x-auto border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F6F6F6] border-b-2 border-[#000091]">
              <th className="px-3 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">
                Environnement
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">
                Nom
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">
                OS
              </th>
              <th className="px-3 py-3 text-center text-xs font-semibold text-[#161616] uppercase tracking-wider w-20">
                CPU
              </th>
              <th className="px-3 py-3 text-center text-xs font-semibold text-[#161616] uppercase tracking-wider w-20">
                RAM (Go)
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">
                Résilience
              </th>
              <th className="px-3 py-3 text-center text-xs font-semibold text-[#161616] uppercase tracking-wider w-16">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fields.map((field, index) => (
              <tr key={field.id} className="hover:bg-[#F6F6F6] transition-colors">
                <td className="px-3 py-2">
                  <select
                    {...register(`vms.${index}.environnement`)}
                    className="w-full px-2 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm appearance-none cursor-pointer"
                  >
                    <option value="Développement">Développement</option>
                    <option value="Recette">Recette</option>
                    <option value="Pré-production">Pré-production</option>
                    <option value="Production">Production</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input
                    {...register(`vms.${index}.nom`)}
                    placeholder="SRV-APP-01"
                    className="w-full px-2 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    {...register(`vms.${index}.role`)}
                    placeholder="Serveur applicatif"
                    className="w-full px-2 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    {...register(`vms.${index}.os`)}
                    className="w-full px-2 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm appearance-none cursor-pointer"
                  >
                    <option value="Linux">Linux</option>
                    <option value="Windows Server">Windows Server</option>
                    <option value="Ubuntu">Ubuntu</option>
                    <option value="RHEL">RHEL</option>
                    <option value="Debian">Debian</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    min="1"
                    max="64"
                    {...register(`vms.${index}.cpu`, { valueAsNumber: true })}
                    className="w-full px-2 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm text-center"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    min="1"
                    max="512"
                    {...register(`vms.${index}.ram`, { valueAsNumber: true })}
                    className="w-full px-2 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm text-center"
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    {...register(`vms.${index}.resilience`)}
                    className="w-full px-2 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm appearance-none cursor-pointer"
                  >
                    <option value="">Aucune</option>
                    <option value="HA">Haute Dispo (HA)</option>
                    <option value="Cluster">Cluster</option>
                    <option value="Active/Passive">Active/Passive</option>
                    <option value="Active/Active">Active/Active</option>
                  </select>
                </td>
                <td className="px-3 py-2 text-center">
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

      {/* Résumé des ressources */}
      <div className="flex gap-4 text-sm">
        <div className="px-3 py-2 bg-[#E3E3FD] rounded">
          <span className="text-[#666666]">Total VMs :</span>
          <span className="ml-2 font-semibold text-[#000091]">{fields.length}</span>
        </div>
        <div className="px-3 py-2 bg-[#E3E3FD] rounded">
          <span className="text-[#666666]">Total CPU :</span>
          <span className="ml-2 font-semibold text-[#000091]">
            {fields.reduce((sum, _, i) => {
              const cpuValue = document.querySelector<HTMLInputElement>(`[name="vms.${i}.cpu"]`)?.value;
              return sum + (parseInt(cpuValue || '0') || 0);
            }, 0)} vCPU
          </span>
        </div>
        <div className="px-3 py-2 bg-[#E3E3FD] rounded">
          <span className="text-[#666666]">Total RAM :</span>
          <span className="ml-2 font-semibold text-[#000091]">
            {fields.reduce((sum, _, i) => {
              const ramValue = document.querySelector<HTMLInputElement>(`[name="vms.${i}.ram"]`)?.value;
              return sum + (parseInt(ramValue || '0') || 0);
            }, 0)} Go
          </span>
        </div>
      </div>

      <p className="text-xs text-[#666666]">
        Définissez toutes les machines virtuelles nécessaires pour chaque environnement.
      </p>
    </div>
  );
}
