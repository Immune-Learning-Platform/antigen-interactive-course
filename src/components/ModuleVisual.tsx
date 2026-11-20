import type { VisualKey } from '../content/types'
import { AiStructureVisual, EpitopeLab, StructureLab } from './labs'
import {
  ConceptTimeline,
  EpitopeTypesVisual,
  PathogenBoard,
  PtmMhcVisual,
  RecombinantPipelineVisual,
  ResponseBranchVisual,
  TwoPropertiesVisual,
} from './visuals'

/** 可视化分发器：内容层只声明 visual key，渲染实现集中在此 */
export function ModuleVisual({ visual }: { visual: VisualKey }) {
  switch (visual) {
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
    default:
      return null
  }
}
