import type { VisualKey } from '../content/types'
import { AiStructureVisual, BoneMarrowLab, EpitopeLab, StructureLab } from './labs'
import {
  ConceptTimeline,
  EpitopeTypesVisual,
  PathogenBoard,
  PtmMhcVisual,
  RecombinantPipelineVisual,
  ResponseBranchVisual,
  TwoPropertiesVisual,
} from './visuals'
import {
  BoneDualRole,
  BoneTimeline,
  HematopoiesisTree,
  LymphocyteLineage,
  MscRepair,
  OrganoidFrontier,
  StemCellRelations,
  TransplantFlow,
} from './bone-visuals'

/**
 * 可视化分发器：内容层只声明 visual key，渲染实现集中在此。
 * 新增章节只需在此登记组件，页面层无需改动。
 */
export function ModuleVisual({ visual }: { visual: VisualKey }) {
  switch (visual) {
    // —— 第1章 抗原 ——
    case 'two-properties':
      return <TwoPropertiesVisual />
    case 'concept-timeline':
      return <ConceptTimeline />
    case 'epitope-lab':
      return <EpitopeLab />
    case 'epitope-types':
      return <EpitopeTypesVisual />
    case 'response-branch':
      return <ResponseBranchVisual />
    case 'ptm-mhc':
      return <PtmMhcVisual />
    case 'pathogen-board':
      return <PathogenBoard />
    case 'structure-lab':
      return <StructureLab />
    case 'recombinant-pipeline':
      return <RecombinantPipelineVisual />
    case 'ai-structure':
      return <AiStructureVisual />
    // —— 第2章 骨髓 ——
    case 'bone-structure':
      return <BoneMarrowLab />
    case 'bone-timeline':
      return <BoneTimeline />
    case 'stem-cell-relations':
      return <StemCellRelations />
    case 'hematopoiesis-tree':
      return <HematopoiesisTree />
    case 'lymphocyte-lineage':
      return <LymphocyteLineage />
    case 'bone-dual-role':
      return <BoneDualRole />
    case 'transplant-flow':
      return <TransplantFlow />
    case 'msc-repair':
      return <MscRepair />
    case 'organoid-frontier':
      return <OrganoidFrontier />
    default:
      return null
  }
}
