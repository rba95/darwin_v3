import { useCallback, useMemo, useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { DatFormValues } from "../../types/dat";
import { Plus, Trash2, Cpu, Check, ChevronDown, ChevronUp } from "lucide-react";

// Catalogue des technologies avec leurs versions
const TECH_CATALOG = {
  os: {
    label: "Systèmes d'exploitation",
    items: [
      { name: "Debian", versions: ["12 (Bookworm)", "11 (Bullseye)", "10 (Buster)"] },
      { name: "Ubuntu Server", versions: ["24.04 LTS", "22.04 LTS", "20.04 LTS"] },
      { name: "RHEL", versions: ["9", "8", "7"] },
      { name: "Rocky Linux", versions: ["9", "8"] },
      { name: "AlmaLinux", versions: ["9", "8"] },
      { name: "Windows Server", versions: ["2022", "2019", "2016"] },
    ]
  },
  web: {
    label: "Serveurs Web",
    items: [
      { name: "Nginx", versions: ["1.26", "1.24", "1.22"] },
      { name: "Apache", versions: ["2.4.58", "2.4.57", "2.4.54"] },
      { name: "Traefik", versions: ["3.0", "2.11", "2.10"] },
      { name: "Caddy", versions: ["2.7", "2.6"] },
    ]
  },
  database: {
    label: "Bases de données",
    items: [
      { name: "PostgreSQL", versions: ["16", "15", "14", "13"] },
      { name: "MariaDB", versions: ["11.2", "10.11", "10.6"] },
      { name: "MySQL", versions: ["8.2", "8.0", "5.7"] },
      { name: "MongoDB", versions: ["7.0", "6.0", "5.0"] },
      { name: "Redis", versions: ["7.2", "7.0", "6.2"] },
    ]
  },
  runtime: {
    label: "Runtimes & Langages",
    items: [
      { name: "Node.js", versions: ["22 LTS", "20 LTS", "18 LTS"] },
      { name: "Python", versions: ["3.12", "3.11", "3.10", "3.9"] },
      { name: "Java (OpenJDK)", versions: ["21 LTS", "17 LTS", "11 LTS"] },
      { name: "PHP", versions: ["8.3", "8.2", "8.1"] },
      { name: ".NET", versions: ["8.0", "7.0", "6.0 LTS"] },
      { name: "Go", versions: ["1.22", "1.21", "1.20"] },
    ]
  },
  container: {
    label: "Conteneurisation & Orchestration",
    items: [
      { name: "Docker", versions: ["25.0", "24.0", "23.0"] },
      { name: "Podman", versions: ["4.9", "4.8", "4.7"] },
      { name: "Kubernetes", versions: ["1.29", "1.28", "1.27"] },
      { name: "Docker Compose", versions: ["2.24", "2.23", "2.22"] },
    ]
  },
  messaging: {
    label: "Messaging & Queue",
    items: [
      { name: "RabbitMQ", versions: ["3.13", "3.12", "3.11"] },
      { name: "Apache Kafka", versions: ["3.6", "3.5", "3.4"] },
      { name: "ActiveMQ", versions: ["6.0", "5.18", "5.17"] },
    ]
  },
  monitoring: {
    label: "Monitoring & Logs",
    items: [
      { name: "Prometheus", versions: ["2.49", "2.48", "2.47"] },
      { name: "Grafana", versions: ["10.3", "10.2", "10.1"] },
      { name: "ELK Stack", versions: ["8.12", "8.11", "8.10"] },
      { name: "Zabbix", versions: ["7.0", "6.4", "6.0 LTS"] },
    ]
  },
};

type TechCategory = keyof typeof TECH_CATALOG;

export function TechStackPanel() {
  const { setValue, watch, getValues } = useFormContext<DatFormValues>();

  const choixTechnologiques = watch("choix_technologiques") || [];

  // State local pour les catégories ouvertes
  const [expandedCategories, setExpandedCategories] = useState<Set<TechCategory>>(new Set(["os"]));

  // Utiliser useFieldArray pour une gestion plus stable
  const { fields, append, remove } = useFieldArray({
    name: "choix_technologiques",
  });

  const toggleCategory = useCallback((category: TechCategory) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  }, []);

  // Extraire les technologies sélectionnées depuis choix_technologiques
  const selectedTechs = useMemo(() => {
    const techs: { category: TechCategory; name: string; version: string }[] = [];

    for (const choix of choixTechnologiques) {
      // Trouver la catégorie par le label
      for (const [cat, data] of Object.entries(TECH_CATALOG) as [TechCategory, typeof TECH_CATALOG[TechCategory]][]) {
        if (data.label === choix.tiers) {
          techs.push({
            category: cat,
            name: choix.produit,
            version: choix.version
          });
          break;
        }
      }
    }

    return techs;
  }, [choixTechnologiques]);

  const toggleTech = useCallback((category: TechCategory, name: string, version: string) => {
    const currentChoix = getValues("choix_technologiques") || [];
    const categoryLabel = TECH_CATALOG[category].label;

    // Chercher si cette technologie existe déjà
    const existingIndex = currentChoix.findIndex(
      (c) => c.tiers === categoryLabel && c.produit === name
    );

    let newChoix = [...currentChoix];

    if (existingIndex >= 0) {
      // Si même version, supprimer
      if (currentChoix[existingIndex].version === version) {
        newChoix = currentChoix.filter((_, i) => i !== existingIndex);
      } else {
        // Sinon, mettre à jour la version
        newChoix[existingIndex] = { ...newChoix[existingIndex], version };
      }
    } else {
      // Ajouter nouvelle sélection
      newChoix.push({
        tiers: categoryLabel,
        produit: name,
        version
      });
    }

    // Mettre à jour le formulaire
    setValue("choix_technologiques", newChoix, { shouldDirty: true });

    // Si c'est un OS, mettre à jour les VMs
    if (category === "os") {
      const selectedOS = newChoix.find(c => c.tiers === TECH_CATALOG.os.label);
      const currentVMs = getValues("vms") || [];

      if (selectedOS && currentVMs.length > 0) {
        const osValue = `${selectedOS.produit} ${selectedOS.version}`;
        const updatedVMs = currentVMs.map((vm) => {
          if (!vm.os || vm.os === "Linux" || vm.os === "Windows Server" ||
            vm.os.includes("Debian") || vm.os.includes("Ubuntu") ||
            vm.os.includes("RHEL") || vm.os.includes("Rocky") ||
            vm.os.includes("Alma")) {
            return { ...vm, os: osValue };
          }
          return vm;
        });
        setValue("vms", updatedVMs, { shouldDirty: true });
      }
    }
  }, [getValues, setValue]);

  const removeTech = useCallback((category: TechCategory, name: string) => {
    const currentChoix = getValues("choix_technologiques") || [];
    const categoryLabel = TECH_CATALOG[category].label;

    const newChoix = currentChoix.filter(
      (c) => !(c.tiers === categoryLabel && c.produit === name)
    );

    setValue("choix_technologiques", newChoix, { shouldDirty: true });
  }, [getValues, setValue]);

  const isSelected = useCallback((category: TechCategory, name: string) => {
    return selectedTechs.some(t => t.category === category && t.name === name);
  }, [selectedTechs]);

  const getSelectedVersion = useCallback((category: TechCategory, name: string) => {
    return selectedTechs.find(t => t.category === category && t.name === name)?.version;
  }, [selectedTechs]);

  // Entrées manuelles
  const addManualEntry = useCallback(() => {
    append({ tiers: "", produit: "", version: "" });
  }, [append]);

  const removeManualEntry = useCallback((index: number) => {
    remove(index);
  }, [remove]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
          <Cpu className="w-5 h-5 !text-purple-600" />
        </div>
        <div>
          <h3 className="!text-lg !font-semibold !text-gray-900">Stack Technologique</h3>
          <p className="!text-sm !text-gray-500">Sélectionnez les technologies et versions utilisées</p>
        </div>
      </div>

      {/* Info box */}
      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
        <p className="!text-sm !text-blue-800">
          <strong>Astuce :</strong> Les systèmes d'exploitation sélectionnés seront automatiquement appliqués aux VMs de l'étape Infrastructure.
        </p>
      </div>

      {/* Technologies sélectionnées */}
      {selectedTechs.length > 0 && (
        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-500">
          <h4 className="text-sm font-semibold text-green-800 mb-3">Technologies sélectionnées ({selectedTechs.length})</h4>
          <div className="flex flex-wrap gap-2">
            {selectedTechs.map((tech, idx) => (
              <span
                key={`selected-${tech.category}-${tech.name}-${idx}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border-2 border-green-400 text-sm"
              >
                <span className="font-medium text-gray-800">{tech.name}</span>
                <span className="text-green-600 font-semibold">{tech.version}</span>
                <button
                  type="button"
                  onClick={() => removeTech(tech.category, tech.name)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Catalogue de technologies */}
      <div className="space-y-3">
        {(Object.entries(TECH_CATALOG) as [TechCategory, typeof TECH_CATALOG[TechCategory]][]).map(([category, data]) => {
          const expanded = expandedCategories.has(category);
          const countInCategory = selectedTechs.filter(t => t.category === category).length;

          return (
            <div key={category} className="border-2 border-[#000091] rounded-lg overflow-hidden">
              {/* Category Header */}
              <button
                type="button"
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#000091] hover:bg-[#1212FF] transition-colors"
              >
                <span className="font-semibold text-white">{data.label}</span>
                <div className="flex items-center gap-2">
                  {countInCategory > 0 && (
                    <span className="px-2 py-0.5 bg-white text-[#000091] text-xs font-bold rounded-full">
                      {countInCategory}
                    </span>
                  )}
                  {expanded ? (
                    <ChevronUp className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white" />
                  )}
                </div>
              </button>

              {/* Category Content */}
              {expanded && (
                <div className="p-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 bg-gray-50">
                  {data.items.map((item) => {
                    const selected = isSelected(category, item.name);
                    const selectedVersion = getSelectedVersion(category, item.name);

                    return (
                      <div
                        key={`${category}-${item.name}`}
                        className={`
                          p-3 rounded-lg border-2 transition-all bg-white
                          ${selected
                            ? 'border-[#000091] shadow-md'
                            : 'border-gray-300 hover:border-gray-400'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-semibold ${selected ? 'text-[#000091]' : 'text-gray-800'}`}>
                            {item.name}
                          </span>
                          {selected && (
                            <Check className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.versions.map((version) => (
                            <button
                              key={`${category}-${item.name}-${version}`}
                              type="button"
                              onClick={() => toggleTech(category, item.name, version)}
                              className={`
                                px-2.5 py-1 text-xs font-medium rounded transition-all
                                ${selectedVersion === version
                                  ? 'bg-[#000091] text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }
                              `}
                            >
                              {version}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ajout manuel */}
      <div className="pt-4 border-t-2 border-[#000091]">
        <button
          type="button"
          onClick={addManualEntry}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#000091] border-2 border-[#000091] rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter une technologie manuellement
        </button>

        {/* Liste des entrées manuelles */}
        {fields.map((field, index) => {
          const choix = choixTechnologiques[index];
          // N'afficher que les entrées manuelles (sans catégorie correspondante)
          const categoryLabels = Object.values(TECH_CATALOG).map(c => c.label);
          const isManual = !categoryLabels.includes(choix?.tiers) || choix?.tiers === "";

          if (!isManual) return null;

          return (
            <div key={field.id} className="mt-4 flex gap-3 items-center">
              <input
                value={choix?.tiers || ""}
                onChange={(e) => {
                  const newChoix = [...choixTechnologiques];
                  newChoix[index] = { ...newChoix[index], tiers: e.target.value };
                  setValue("choix_technologiques", newChoix);
                }}
                placeholder="Catégorie"
                className="flex-1 px-3 py-2 bg-white border-2 border-[#000091] rounded-lg text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
              <input
                value={choix?.produit || ""}
                onChange={(e) => {
                  const newChoix = [...choixTechnologiques];
                  newChoix[index] = { ...newChoix[index], produit: e.target.value };
                  setValue("choix_technologiques", newChoix);
                }}
                placeholder="Produit"
                className="flex-1 px-3 py-2 bg-white border-2 border-[#000091] rounded-lg text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
              <input
                value={choix?.version || ""}
                onChange={(e) => {
                  const newChoix = [...choixTechnologiques];
                  newChoix[index] = { ...newChoix[index], version: e.target.value };
                  setValue("choix_technologiques", newChoix);
                }}
                placeholder="Version"
                className="w-28 px-3 py-2 bg-white border-2 border-[#000091] rounded-lg text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeManualEntry(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border-2 border-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
