import {Button} from "@momecap/ui-kit-snapmoment";
import s from './UserTabsNavigation.module.scss'
import {clsx} from "clsx";
import {userTabsVariants} from "@/shared/lib";

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
              className={clsx(s.variant, activeSection === variant && s.activeVariant)}
              onClick={handleClick(variant)}
              variant={'text'}
            >
              {variant}
            </Button>
            <span className={clsx(s.line, activeSection === variant && s.activeLine)} />
          </div>
        ))}
    </div>
  );
}