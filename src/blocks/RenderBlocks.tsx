import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import { HomeHeroBlock } from '@/blocks/HomeHero/Component'
import { ProjectAccordionBlock } from '@/blocks/ProjectAccordion/Component'
import { WhyNotionhiveBlock } from '@/blocks/WhyNotionhive/Component'
import { ServiceGridBlock } from '@/blocks/ServiceGrid/Component'
import { OurProcessBlock } from '@/blocks/OurProcessBlock/Component'
import { UspTableBlock } from '@/blocks/UspTable/Component'
import { NumbersSectionBlock } from '@/blocks/NumbersSection/Component'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/Component'
import { ContactUsSectionBlock } from '@/blocks/ContactUsSection/Component'
import { LevelUpCTABlock } from '@/blocks/LevelUpCTA/Component'
import { CaseStudiesBlock } from '@/blocks/CaseStudiesBlock/Component'
import { OurApproachBlock } from '@/blocks/OurApproach/Component'
import { BrandsBlock } from '@/blocks/BrandsBlock/Component'
import { ServiceDetailsBannerBlock } from '@/blocks/ServiceDetailsBanner/Component'
import { BusinessBlock } from '@/blocks/BusinessBlock/Component'
import { PageBannerBlock } from '@/blocks/PageBanner/Component'
import { TitleWithTabsBlock } from '@/blocks/TitleWithTabs/Component'
import { BookConsultationBlock } from '@/blocks/BookConsultation/Component'
import { AboutUsStrategyBlock } from '@/blocks/AboutUsStrategy/Component'
import { OurStoryBlock } from '@/blocks/OurStory/Component'
import { AwardsRecognitionBlock } from '@/blocks/AwardsRecognition/Component'
import { OurClientsBlock } from '@/blocks/OurClients/Component'
import { JoinOurTeamBlock } from '@/blocks/JoinOurTeam/Component'
import { CaseStudiesBannerBlock } from '@/blocks/CaseStudiesBanner/Component'
import { AllCaseStudiesBlock } from '@/blocks/AllCaseStudies/Component'
import { WorkTogetherBlock } from '@/blocks/WorkTogether/Component'
import { CaseSummaryBlock } from '@/blocks/CaseSummary/Component'
import { CaseDetailsBlock } from '@/blocks/CaseDetails/Component'
import { IncludedServicesBlock } from '@/blocks/IncludedServices/Component'
import { IndustryExperienceBlock } from '@/blocks/IndustryExperience/Component'
import { LifeAtNHBlock } from '@/blocks/LifeAtNH/Component'
import { FeaturedBlogPostBlock } from '@/blocks/FeaturedBlogPost/Component'
import { BlogPostsBlock } from '@/blocks/BlogPosts/Component'
import { ProjectDiscussionBlock } from '@/blocks/ProjectDiscussion/Component'
import { OfficeAddressBlock } from '@/blocks/OfficeAddress/Component'
import { AwardsBlock } from '@/blocks/AwardsBlock/Component'
import { VideoTestimonialBlock } from '@/blocks/VideoTestimonial/Component'
import { RichContentBlock } from '@/blocks/RichContent/Component'

const blockComponents = {
  homeHero: HomeHeroBlock,
  projectAccordion: ProjectAccordionBlock,
  whyNotionhive: WhyNotionhiveBlock,
  serviceGrid: ServiceGridBlock,
  ourProcessBlock: OurProcessBlock,
  uspTable: UspTableBlock,
  numbersSection: NumbersSectionBlock,
  testimonialsBlock: TestimonialsBlock,
  contactUsSection: ContactUsSectionBlock,
  levelUpCTA: LevelUpCTABlock,
  caseStudiesBlock: CaseStudiesBlock,
  ourApproach: OurApproachBlock,
  brandsBlock: BrandsBlock,
  serviceDetailsBanner: ServiceDetailsBannerBlock,
  businessBlock: BusinessBlock,
  pageBanner: PageBannerBlock,
  titleWithTabs: TitleWithTabsBlock,
  bookConsultation: BookConsultationBlock,
  aboutUsStrategy: AboutUsStrategyBlock,
  ourStory: OurStoryBlock,
  awardsRecognition: AwardsRecognitionBlock,
  ourClients: OurClientsBlock,
  joinOurTeam: JoinOurTeamBlock,
  caseStudiesBanner: CaseStudiesBannerBlock,
  allCaseStudies: AllCaseStudiesBlock,
  workTogether: WorkTogetherBlock,
  caseSummary: CaseSummaryBlock,
  caseDetails: CaseDetailsBlock,
  includedServices: IncludedServicesBlock,
  industryExperience: IndustryExperienceBlock,
  ourProcess: OurProcessBlock,
  lifeAtNH: LifeAtNHBlock,
  featuredBlogPost: FeaturedBlogPostBlock,
  blogPosts: BlogPostsBlock,
  projectDiscussion: ProjectDiscussionBlock,
  officeAddress: OfficeAddressBlock,
  awardsBlock: AwardsBlock,
  videoTestimonial: VideoTestimonialBlock,
  richContent: RichContentBlock,
}

export type LayoutBlock = NonNullable<Page['layout']>[number]

export const RenderBlocks: React.FC<{
  blocks: LayoutBlock[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
