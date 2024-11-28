import {Button} from "@momecap/ui-kit-snapmoment";
import s from './UserTabsNavigation.module.scss'
import {userTabsVariants} from "@/widget/userTabs/UserTabs";

type Props = {
  activeSection: string
  setActiveSection: (section: string) => void
}


export const UserTabsNavigation = (props: Props) => {
  const {setActiveSection, activeSection} = props
  const userTabsVariantsArray = Object.values(userTabsVariants)
  const handleClick = (variant: string) => () => {
    setActiveSection(variant)
  }
  return (
    <div className={s.wrapper}>
        {userTabsVariantsArray.map((variant, index) => (
          <div className={s.section} key={index}>
            <Button
              className={`${s.variant} ${activeSection === variant ? s.activeVariant : ''}`}
              onClick={handleClick(variant)}
              variant={'text'}
            >
              {variant}
            </Button>
            <span className={`${s.line} ${activeSection === variant ? s.activeLine : ''}`} />
          </div>
        ))}
    </div>
  );
}