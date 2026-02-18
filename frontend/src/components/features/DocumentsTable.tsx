import { useFieldArray, useFormContext } from "react-hook-form";
import { DatFormValues, defaultDocumentReference, defaultGlossaireItem } from "../../types/dat";
import { Plus, Trash2, FileText, BookOpen } from "lucide-react";

export function DocumentsReferenceTable() {
  const { register, control } = useFormContext<DatFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents_reference"
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E3E3FD] flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#000091]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#161616]">Documents de Référence</h3>
            <p className="text-sm text-[#666666]">Documents cités dans ce DAT</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => append({ ...defaultDocumentReference })}
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase">Émetteur</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase">Document</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase w-28">Version</th>
              <th className="px-4 py-3 text-center w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fields.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-[#666666]">
                  Aucun document de référence
                </td>
              </tr>
            ) : (
              fields.map((field, index) => (
                <tr key={field.id} className="hover:bg-[#F6F6F6] transition-colors">
                  <td className="px-4 py-2">
                    <input
                      {...register(`documents_reference.${index}.emetteur`)}
                      placeholder="Ex: DSI"
                      className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      {...register(`documents_reference.${index}.document`)}
                      placeholder="Ex: Politique de sécurité SI"
                      className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      {...register(`documents_reference.${index}.version`)}
                      placeholder="1.0"
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

export function GlossaireTable() {
  const { register, control } = useFormContext<DatFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "glossaire"
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E3E3FD] flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#000091]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#161616]">Glossaire</h3>
            <p className="text-sm text-[#666666]">Définitions des termes et abréviations</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => append({ ...defaultGlossaireItem })}
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase w-1/3">Abréviation</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#161616] uppercase">Signification</th>
              <th className="px-4 py-3 text-center w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fields.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-[#666666]">
                  Aucune entrée dans le glossaire
                </td>
              </tr>
            ) : (
              fields.map((field, index) => (
                <tr key={field.id} className="hover:bg-[#F6F6F6] transition-colors">
                  <td className="px-4 py-2">
                    <input
                      {...register(`glossaire.${index}.abreviation`)}
                      placeholder="Ex: API"
                      className="w-full px-3 py-2 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      {...register(`glossaire.${index}.signification`)}
                      placeholder="Ex: Application Programming Interface"
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
