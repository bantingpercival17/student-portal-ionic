<template>
    <modal id="add-vessel" :tabindex="-1" role="dialog" mainClass="bd-example-modal-lg" dialogClass="modal-lg"
        ariaLabelled="MOPMLabel" :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="exampleModalScrollableTitle">
                ADD VESSEL INFORMATION
            </h5>
        </model-header>
        <model-body>
            <ShipboardApplicationForm :propsCompany="dataForm.companyList"
                :propsDocuments="dataForm.documentRequirements" :vesselType="dataForm.vesselType" />
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>
    </modal>
</template>
<script>
import ShipboardApplicationForm from '@/components/main-layouts/components/widgets/ShipboardApplicationForm.vue'
export default {
    name: 'AddVesselModal',
    props: {
        dataForm: { Object }
    },
    components: {
        ShipboardApplicationForm
    }
}
</script>