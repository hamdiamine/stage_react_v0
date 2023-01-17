import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import 'moment/locale/fr'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useDispatch, useSelector } from "react-redux"
import Item from "../../generic/item/Item"
import ActionsMenu from "../../generic/actionsMenu/ActionsMenu"
import { Dialog } from "primereact/dialog"
import PlanifierInventaire from "../planifierInventaire/PlanifierInventaire"
import { planificationInventaireActions } from "app/core/store/inventaire/PlanificationInventaireSlice"
import { inventaireActions } from "app/core/store/inventaire/InventaireSlice"

const CalendrierInventaire = () => {
    const dispatch = useDispatch()
    const selectedInventaire = useSelector((state) => state.inventaire.selectedInventaire)
    const activeEdition = useSelector((state) => state.inventaire.activeEdition)
    const events = useSelector((state) => state.planifInv.events)
    const displayPlanifPopup = useSelector((state) => state.planifInv.displayPlanifPopup)
    const listPlanifInv = useSelector((state) => state.planifInv.listPlanifInv)

    const localizer = momentLocalizer(moment)
    const DnDCalendar = withDragAndDrop(Calendar);

    const onResizeHandle = (data) => {
        dispatch(planificationInventaireActions.majEvent({ data: data }))
        dispatch(inventaireActions.setActiveEdition({ activeEdition: true }))
    }

    const onDropHandle = (data) => {
        dispatch(planificationInventaireActions.majEvent({ data: data }))
        dispatch(inventaireActions.setActiveEdition({ activeEdition: true }))

    }

    const onSelectHandle = (data) => {
        console.log(data)
    }

    const onPlanifHandle = () => {
        dispatch(planificationInventaireActions.setDisplayPlanifPopup({ displayPlanifPopup: true }))
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        let backgroundColor = null
        let border = null

        backgroundColor = '#17A589'
        border = '2px solid #117A65'

        let style = {
            backgroundColor: backgroundColor,
            borderRadius: '7px',
            opacity: 0.8,
            border: border,
            color: 'black',
            display: 'block'
        };
        return {
            style: style
        };
    }

    const onHideSearchPopup = () => {
        dispatch(planificationInventaireActions.setDisplayPlanifPopup({ displayPlanifPopup: false }))
    }

    return (
        <Item>
            <ActionsMenu
                key="02"
                titre="Planning inventaire"
                afficheBtnMenu="1"
                withPlanif={(activeEdition && selectedInventaire.id) ? "1" : undefined}
                onPlanif={onPlanifHandle}
            ></ActionsMenu>
            <DnDCalendar
                defaultDate={moment().toDate()}
                defaultView="month"
                events={events}
                localizer={localizer}
                onEventDrop={onDropHandle}
                onEventResize={onResizeHandle}
                onSelectEvent={onSelectHandle}
                eventPropGetter={eventStyleGetter}
                resizable
                style={{ height: "100vh" }}
                messages={{
                    next: "Suivant",
                    previous: "Précédent",
                    today: "Aujourd'hui",
                    month: "Mois",
                    week: "Semaine",
                    day: "Jour"
                }}
            />
            <Dialog header="Planifier inventaire" maximizable visible={displayPlanifPopup} onHide={onHideSearchPopup} breakpoints={{ '960px': '75vw' }} style={{ width: '70vw' }}>
                <PlanifierInventaire />
            </Dialog>
        </Item>
    )
}

export default CalendrierInventaire;