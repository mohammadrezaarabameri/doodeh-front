const table = document.querySelector("#book-list");
const itemTable = document.getElementById("item--list-table");
const card = document.getElementsByClassName("content")[0];
const button = document.querySelector("button");
const feed = document.querySelector("#feed");
const searchInput = document.getElementById("search-chicken");
const searchIcon = document.querySelector(".fas .fa-search");

const batchList = document.getElementById("batch-list");
const batchListTable = document.getElementById("batch-list-table");
const deleteAssetBtn = document.getElementById("batch--delete-asset");

const batchCheckBox = document.getElementById("batch-check-box");
const assetCheckBox = document.getElementById("asset-check-box");
const addAssetToBatchBtn = document.getElementById("add-asset-to-batch");

const productionSection = document.getElementById("production-section");
const warehouseSection = document.getElementById("warehouse-section");
const requestSection = document.getElementById("request-section");
const shopSection = document.getElementById("shop-section");
const listSection = document.getElementById("list-section");
const addMoneySection = document.getElementById("add-money-section");
const historySection = document.getElementById("history-section");

//profile image
const profileImage = document.getElementById("profile-image");

// modal
const modalBody = document.getElementById("modal-body");
const save = document.getElementById("save");
const modalTitle = document.getElementsByClassName("modal-title")[0];
const modal = document.getElementById("modal-default");
const batchIds = document.getElementById("batches--id");
const profileCard = document.getElementById("profile-card");
const inventorySidebar = document.getElementById("inventory-sidebar");
const blockedInvenory = document.getElementById("blocked-amount");
const usernameSidebar = document.getElementById("username-sidebar");

const batchSection = document.getElementById("batch-section");
const itemSection = document.getElementById("item-section");
const tabsSection = document.getElementById("tabs-section");

const penBtn = document.querySelectorAll(".body--pencil");
const infoBtn = document.querySelectorAll(".body--info");
const plusBtn = document.querySelectorAll(".body--plus");

// meta mask
const metaMaskSection = document.getElementById("connect-metamask-section");
const metaMaskBtn = document.getElementById("metamask-connect-btn");
const walletAddr = document.getElementById("wallet-address");
const walletBalance = document.getElementById("wallet-balance");

const metaMaskDropdownSection = document.getElementById("metamask-dropdown");
const metaMaskdropdownItems = document.getElementsByClassName(
  "metamask-dropdown-items"
);

for (let i = 0; i < metaMaskdropdownItems.length; i++) {
  metaMaskdropdownItems[i].addEventListener("click", (e) =>
    e.stopPropagation()
  );
}

const HOST = "http://116.203.61.236:4000";

const getImage = "user/profile";

const getAssetByOwner = "channels/mychannel/chaincodes/chaincode/assets/owner";

const setChickenForSale =
  "channels/mychannel/chaincodes/chaincode/collection/Market/asset/public";

const getAssetsInMarket = "collection/Market/objects";

const getAssetHistory = "channels/mychannel/chaincodes/chaincode/asset/history";

const getBatchesByOwner =
  "channels/mychannel/chaincodes/chaincode/batchs/owner";

const changeStatus =
  "channels/mychannel/chaincodes/chaincode/asset/status/change";
const changeMetaData = "channels/mychannel/chaincodes/chaincode/attr/put";

const changeMetaDataForBatch =
  "channels/mychannel/chaincodes/chaincode/batch/attr/put";

const addAssetToBatch = "channels/mychannel/chaincodes/chaincode/batch/add";

const getBatchAssets = "channels/mychannel/chaincodes/chaincode/batch/assets";

const deleteAssetFromBatch =
  "channels/mychannel/chaincodes/chaincode/batch/remove";

const getUsersRole = "organizations/roles";

const changeAssetOwnership =
  "channels/mychannel/chaincodes/chaincode/asset/owner/change";

const getAssetsByStatus =
  "channels/mychannel/chaincodes/chaincode/assets/status";

const getAssetsByBuyer = "channels/mychannel/chaincodes/chaincode/assets/buyer";

const getAllAssetsByGD = "channels/mychannel/chaincodes/chaincode/assets/GD";
const getAllAssetsByLD = "channels/mychannel/chaincodes/chaincode/assets/LD";

const takeDelivery =
  "channels/mychannel/chaincodes/chaincode/asset/delivery/take";

const getTokenURL = HOST + "/channels/mychannel/chaincodes/chaincode/token";

const getImageUser = `${HOST}/${getImage}`;
const getAssetsOwnerURL = `${HOST}/${getAssetByOwner}`;
const setChickenForSaleURL = `${HOST}/${setChickenForSale}`;
const getAssetsURL = `${HOST}/${getAssetsInMarket}`;
const getAssetHistoryURL = `${HOST}/${getAssetHistory}`;
const getChickensBatchURL = `${HOST}/${getBatchesByOwner}`;
const changeAssetStatusURL = `${HOST}/${changeStatus}`;
const changeMetaDataURL = `${HOST}/${changeMetaData}`;
const addAssetToBatchURL = `${HOST}/${addAssetToBatch}`;
const getBatchAssetsURL = `${HOST}/${getBatchAssets}`;
const deleteAssetFromBatchURL = `${HOST}/${deleteAssetFromBatch}`;
const getUsersRoleURL = `${HOST}/${getUsersRole}`;
const changeAssetOwnershipURL = `${HOST}/${changeAssetOwnership}`;
const changeMetaDataForBatchURL = `${HOST}/${changeMetaDataForBatch}`;
const getAssetsByStatusURL = `${HOST}/${getAssetsByStatus}`;
const getAssetsByBuyerURL = `${HOST}/${getAssetsByBuyer}`;
const takeDeliveryURL = `${HOST}/${takeDelivery}`;
const getAllAssetsByGDURL = `${HOST}/${getAllAssetsByGD}`;
const getAllAssetsByLDURL = `${HOST}/${getAllAssetsByLD}`;

let assets = null;
let batchId_ = null;

let assetsToAddBatch = [];
let assetsMetadata = [];
let assetsStatus = [];
let user = null;
let currUserRole = null;
let assetsOfBatch = [];

// "userData" saves all fetched data from asset owner api
// todo: change name required
let userData = null;

// NOTICE: this is for demo
const warehouseOwner = "username@OrgD2";
const retailerWarehouseOwner = "username@OrgD2";

const token = localStorage.getItem("token");

// status objects
const produced = {
  name: "Produced",
  color: "badge-info",
};

const wasted = {
  name: "Wasted",
  color: "badge-danger",
};

const warehouse = {
  name: "Warehouse",
  color: "badge-success",
};

const readyToSale = {
  name: "FinalProduct",
  color: "badge-success",
};

const paid = {
  name: "paid",
  color: "badge-info",
};

const readyToLocalDelivery = {
  name: "ReadyToLocalDelivery",
  color: "badge-warning",
};

const localDelivery = {
  name: "LocalDelivery",
  color: "badge-warning",
};

const globalDelivery = {
  name: "GlobalDelivery",
  color: "badge-warning",
};

const readyToGlobalDelivery = {
  name: "readyToGlobalDelivery",
  color: "badge-warning",
};

const finalProduct = {
  name: "finalProduct",
  color: "badge-success",
};

const deliverd = {
  name: "deliverd",
  color: "badge-success",
};

const roles = {
  retailer: "Retailer",
  wholeSaler: "wholeSaler",
  warehouse: "Warehouse",
  factory: "Factory",
  localDelivery: "LocalDelivery",
  globalDelivery: "GlobalDelivery",
  customer: "Customer",
};

// combine all status into one array
const AssetStatus = [
  {
    name: produced.name,
    color: produced.color,
  },
  {
    name: wasted.name,
    color: wasted.color,
  },
  {
    name: warehouse.name,
    color: warehouse.color,
  },
  {
    name: readyToSale.name,
    color: readyToSale.color,
  },
  {
    name: paid.name,
    color: paid.color,
  },
  {
    name: readyToLocalDelivery.name,
    color: readyToLocalDelivery.color,
  },
  {
    name: localDelivery.name,
    color: localDelivery.color,
  },
  {
    name: globalDelivery.name,
    color: globalDelivery.color,
  },
  {
    name: readyToGlobalDelivery.name,
    color: readyToGlobalDelivery.color,
  },
  {
    name: finalProduct.name,
    color: finalProduct.color,
  },
  {
    name: deliverd.name,
    color: deliverd.color,
  },
];

let userID = null;

// NOTICE: change name require ChickenID -> AssetID
let ChickenID = null;
let chickenPrice = null;

const usersData = null;
let checkedAll = true;
let selectStatus = null;

let metaProducedDate,
  metaType,
  metaMaterial,
  selectedMetaDataKey,
  selectedMetaDataVal;
let modalSignal = "";
let transferToWarehouse = null;

const headerReq = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const saveBtnSignal = {
  // todo: add signal here
};

const showModal = (statement, msgError, msgSuccess) => {
  if (card.getElementsByClassName("alert").length !== 0) {
    alerts = card.getElementsByClassName("alert");
    for (let index = 0; index < alerts.length; index++) {
      alerts[index].remove();
    }
  }
  if (
    document.getElementById("alert-1") == undefined ||
    document.getElementById("alert-1") == null ||
    document.getElementById("alert-2") == undefined ||
    document.getElementById("alert-2") == null
  ) {
    if (!statement) {
      card.insertAdjacentHTML(
        "beforebegin",
        `
  <div class="alert alert-danger" role="alert" id='alert-1'>
         ${msgError}
  </div>
  `
      );
      let alert1 = document.getElementById("alert-1");
      setTimeout(() => alert1.remove(), 3000);
    } else {
      card.insertAdjacentHTML(
        "beforebegin",
        `
  <div class="alert alert-success" role="alert" id='alert-2'>
          ${msgSuccess}
  </div>
  `
      );
      let alert2 = document.getElementById("alert-2");
      setTimeout(() => alert2.remove(), 3000);
    }
  }
};

const changeAssetOwner = (assId, newOwner) => {
  const data = {
    id: assId,
    newOwner: newOwner,
  };

  fetch(changeAssetOwnershipURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if ($("#modal-default").hasClass("show")) {
        $("#modal-default").modal("toggle");
      }
      if (data.result?.message) {
        let userIndex = userData.findIndex((obj) => obj.id === assId);
        userData.splice(userIndex, 1);
        getAllChickens(userData);

        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-success" role="alert" id='alert-2'>
                Ownership of Asset with ${assId} changed; 
        </div>
        `
        );
        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      } else {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Ownership change failed
        </div>
        `
        );

        let alert1 = document.getElementById("alert-1");
        setTimeout(() => alert1.remove(), 3000);
      }
    });
};

const setChickenForSaleReq = (assId, price) => {
  modalBody.innerHTML = `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
  </div>
</div>
  `;

  const data = {
    assetId: assId,
    price: price,
  };

  fetch(setChickenForSaleURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status === 401) {
        location.replace("../../login-v2.html");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      // loading
      if ($("#modal-default").hasClass("show")) {
        $("#modal-default").modal("toggle");
      }

      if (card.getElementsByClassName("alert").length !== 0) {
        alerts = card.getElementsByClassName("alert");
        for (let index = 0; index < alerts.length; index++) {
          alerts[index].remove();
        }
      }

      // TODO: change required
      if (data.result === null || data.success == false) {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Status change failed
        </div>
        `
        );
        let alert1 = document.getElementById("alert-1");
        setTimeout(() => alert1.remove(), 3000);
      } else {
        let userIndex = userData.findIndex((obj) => obj.id === ChickenID);
        let colorStatus = AssetStatus.filter(
          (obj) => obj.name === readyToSale.name
        )[0];

        userData[userIndex].status = readyToSale.name;
        userData[userIndex].price = price;
        userData[userIndex].statusColor = colorStatus.color;

        changeStatusColorOnServer(
          ChickenID,
          readyToSale.name,
          userData[userIndex].type
        );

        itemTable.innerHTML = "";
        getAllBatches(userData);
        getAllChickens(userData);
      }
    });
};

// determine color of status base on its status code
const giveStatusColor = (data) => {
  let statusObj = null;
  for (let i = 0; i < data.result.length; i++) {
    statusObj = AssetStatus.filter((obj) => obj.name === data.result[i].status);
    if (statusObj.length > 0) {
      data.result[i].statusColor = statusObj[0].color;
    } else {
      data.result[i].statusColor = produced.color;
    }
  }
  return data;
};

// request to backend for change status
const changeStatusColorOnServer = (assetId, selectedVal, assetType = "") => {
  const statusData = {
    id: assetId,
    status: selectedVal,
  };

  console.log(assetType);

  fetch(changeAssetStatusURL, {
    method: "POST",
    body: JSON.stringify(statusData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      
      /* todo: bug fix required */
      // if (assetType.toLowerCase() === "buyer") {
      //   console.log("buyer executed");

      //   let assetObj = assetDataBuyer.find((obj) => obj.id === assetId);
      //   assetObj.owner = assetObj.buyer;
      //   let assetIndex = assetDataBuyer.findIndex((obj) => obj.id === assetId);

      //   assetObj.status = paid.name;
      //   assetObj.statusColor = paid.color;
      //   assetDataOwnedBuyer.push(assetObj);

      //   confirmBuyerBtn.remove();

      //   assetDataBuyer.splice(assetIndex, 1);
      //   setTableRowsForBuyerAsset(assetDataBuyer);
      //   setTheTableForConfirmedBuy(assetDataOwnedBuyer);

      //   card.insertAdjacentHTML(
      //     "beforebegin",
      //     `
      //   <div class="alert alert-success" role="alert" id='alert-2'>
      //           Asset confirmed to be received;
      //   </div>
      //   `
      //   );
      //   let alert2 = document.getElementById("alert-2");
      //   setTimeout(() => alert2.remove(), 3000);
      // }

      if (
        selectedVal === warehouse.name &&
        assetType.toLowerCase() === "batch"
      ) {
        changeAssetOwner(assetId, warehouseOwner);
      } else if (
        selectedVal === warehouse.name &&
        assetType.toLowerCase() === "chicken"
      ) {
        changeAssetOwner(assetId, retailerWarehouseOwner);
      } else if (assetType == "delivery") {
        if ($("#modal-default").hasClass("show")) {
          $("#modal-default").modal("toggle");
        }
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-success" role="alert" id='alert-2'>
                Asset status changed successfully 
        </div>
        `
        );
        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      } else {
        if ($("#modal-default").hasClass("show")) {
          $("#modal-default").modal("toggle");
        }
      }
    });
};

const addMetaData = (chickenID, key, value, ins, multiple = 1) => {
  const data = {
    id: chickenID,
    key: key,
    value: value,
    instruction: ins,
  };

  fetch(changeMetaDataURL, {
    method: "POST",
    headers: headerReq,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (multiple == 1) {
        $("#modal-default").modal("toggle");
      }
      if (card.getElementsByClassName("alert").length !== 0) {
        alerts = card.getElementsByClassName("alert");
        for (let index = 0; index < alerts.length; index++) {
          alerts[index].remove();
        }
      }

      // TODO: change required
      if (data.result === null || data.success == false) {
        metaTitle = null;
        metaValue = null;
        metaInstruction = null;

        if (
          document.getElementById("alert-1") == undefined ||
          document.getElementById("alert-1") == null
        ) {
          card.insertAdjacentHTML(
            "beforebegin",
            `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Metadata couldn't be added at the moment!
        </div>
        `
          );
          let alert1 = document.getElementById("alert-1");
          setTimeout(() => alert1.remove(), 3000);
        }
      } else {
        metaTitle = null;
        metaValue = null;
        metaInstruction = null;

        if (
          document.getElementById("alert-2") == undefined ||
          document.getElementById("alert-2") == null
        ) {
          if (assetsOfBatch.length > 0) {
            let batchAssetObj = assetsOfBatch.filter(
              (asset) => asset.id === chickenID
            )[0];
            batchAssetObj.attrs.push({
              key: key,
              value: value,
              instruction: ins,
            });
          } else {
            let assetObj = userData.filter(
              (asset) => asset.id === chickenID
            )[0];
            assetObj.attrs.push({ key: key, value: value, instruction: ins });
          }

          card.insertAdjacentHTML(
            "beforebegin",
            `
        <div class="alert alert-success" role="alert" id='alert-2'>
                Asset Metadata Added Successfully!
        </div>
        `
          );
          let alert2 = document.getElementById("alert-2");
          setTimeout(() => alert2.remove(), 3000);
        }
      }
    });
};

const addMetaDataToBatch = (batchId, key, value, ins) => {
  modalBody.innerHTML = `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
  </div>
</div>
  `;
  const data = {
    batchId: batchId,
    key: key,
    value: value,
    instruction: ins,
  };

  fetch(changeMetaDataForBatchURL, {
    method: "POST",
    headers: headerReq,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      $("#modal-default").modal("toggle");
      if (card.getElementsByClassName("alert").length !== 0) {
        alerts = card.getElementsByClassName("alert");
        for (let index = 0; index < alerts.length; index++) {
          alerts[index].remove();
        }
      }

      // TODO: change required
      if (data.result === null || data.success == false) {
        metaTitle = null;
        metaValue = null;
        metaInstruction = null;

        if (
          document.getElementById("alert-1") == undefined ||
          document.getElementById("alert-1") == null
        ) {
          card.insertAdjacentHTML(
            "beforebegin",
            `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Metadata couldn't be added at the moment!
        </div>
        `
          );
          let alert1 = document.getElementById("alert-1");
          setTimeout(() => alert1.remove(), 3000);
        }
      } else {
        metaTitle = null;
        metaValue = null;
        metaInstruction = null;

        if (
          document.getElementById("alert-2") == undefined ||
          document.getElementById("alert-2") == null
        ) {
          let assetObj = userData.filter((asset) => asset.id === batchId)[0];
          assetObj.attrs.push({ key: key, value: value, instruction: ins });

          card.insertAdjacentHTML(
            "beforebegin",
            `
        <div class="alert alert-success" role="alert" id='alert-2'>
                Asset Metadata Added Successfully!
        </div>
        `
          );
          let alert2 = document.getElementById("alert-2");
          setTimeout(() => alert2.remove(), 3000);
        }
      }
    });
};

// remove asset from batch //
const removeAssetFromBatch = (assetIDs = [], batchID) => {
  modalBody.innerHTML = `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
  </div>
</div>
  `;

  const addBatchData = {
    batchId: batchID,
    assetsIds: assetIDs,
  };

  fetch(deleteAssetFromBatchURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addBatchData),
  })
    .then((res) => res.json())
    .then((data) => {
      // loading
      $("#modal-default").modal("toggle");

      if (data.result === 400) {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Transation Failed
        </div>
        `
        );
        let alert1 = document.getElementById("alert-1");
        setTimeout(() => alert1.remove(), 3000);
      } else {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-success" role="alert" id='alert-2'>
                Item(s) delete from Batch Successfully
        </div>
        `
        );

        for (let i = 0; i < assetIDs.length; i++) {
          let batchItemIndex = assetsOfBatch.findIndex(
            (obj) => obj.id === assetIDs[i]
          );
          assetsOfBatch.splice(batchItemIndex, 1);
        }

        replaceAssetsOfBatch(assetsOfBatch, batchID);

        let batchIndex = userData.findIndex((obj) => obj.id === batchID);
        userData[batchIndex].childesCount = assetsOfBatch.length;

        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      }
    });
};

const deleteItemFromBatch = (batchId) => {
  removeAssetFromBatch([ChickenID], batchId);
};

deleteAssetBtn.addEventListener("click", (e) => {
  // data-toggle="modal" data-target="#modal-default"
  // loading
  $("#modal-default").modal("toggle");
  setModalOnDeleteAssetsOfBatch();
});

////////

const setModalOnDeleteAssetsOfBatch = () => {
  modalSignal = "DELETE";
  save.style.display = "block";
  save.textContent = "Yes";

  modalBody.innerHTML = "";
  modalTitle.textContent = "unpacked assets";
  modalBody.innerText =
    "Are you sure, you want to remove item(s) from this batch?";
};

const addSelectedAssetToBatch = (assetIDs = [], batchID) => {
  modalBody.innerHTML = `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
  </div>
</div>
  `;

  const addBatchData = {
    batchId: batchID,
    assetsIds: assetIDs,
  };

  fetch(addAssetToBatchURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addBatchData),
  })
    .then((res) => res.json())
    .then((data) => {
      // loading
      $("#modal-default").modal("toggle");

      if (data.result === 400) {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Transation Failed
        </div>
        `
        );
        let alert1 = document.getElementById("alert-1");
        setTimeout(() => alert1.remove(), 3000);
      } else {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-success" role="alert" id='alert-2'>
                Transaction Successful
        </div>
        `
        );
        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);

        let batchIndex = userData.findIndex((item) => item.id === batchID);
        userData[batchIndex].childesCount += assetIDs.length;

        assetIDs.forEach((item) => {
          let itemIndex = userData.findIndex((asset) => asset.id === item);
          userData.splice(itemIndex, 1);
        });

        getAllBatches(userData);
        getAllChickens(userData);
      }
    });
};

const setModalonEdit = (assetId) => {
  modalSignal = "EDIT";
  save.style.display = "block";

  modalBody.innerHTML = "";
  modalTitle.textContent = "Change status";
  modalBody.insertAdjacentHTML(
    "beforeend",
    `
    <div class='container'>
      <select class="form-control" id="status-select">
        <option class="${wasted.color}" value="${wasted.name}">${wasted.name}</option>
        </select>
        </div>
        `
  );
  selectStatus = document.getElementById("status-select");

  let assetObj;
  if (assetsOfBatch.length > 0) {
    assetObj = assetsOfBatch.find((obj) => obj.id === ChickenID);
  } else {
    assetObj = userData.find((obj) => obj.id === ChickenID);
  }

  if (currUserRole == roles.factory) {
    selectStatus.insertAdjacentHTML(
      `beforeend`,
      `
      <option class="${produced.color}" value="${produced.name}">${produced.name}</option>
    `
    );
  }

  if (
    assetObj.type.toLowerCase() === "batch" &&
    assetObj.childesCount > 0 &&
    assetObj.price == 0 &&
    currUserRole == roles.factory
  ) {
    selectStatus.insertAdjacentHTML(
      `beforeend`,
      `
    <option class="${warehouse.color}" value="${warehouse.name}">${warehouse.name}</option>
    `
    );
  } else if (
    assetObj.type.toLowerCase() !== "batch" &&
    assetObj.childesCount >= 0 &&
    assetObj.price == 0 &&
    currUserRole == roles.retailer
  ) {
    selectStatus.insertAdjacentHTML(
      `beforeend`,
      `
    <option class="${readyToSale.color}" value="${readyToSale.name}">${readyToSale.name}</option>
    `
    );

    selectStatus.addEventListener("change", (e) => {
      if (e.target.value == readyToSale.name) {
        modalBody.insertAdjacentHTML(
          "beforeend",
          `
            <input type='number' id='chicken-price' name='chicken-price' class='form-control mt-2' placeholder='Enter the price' require />
        `
        );

        chickenPrice = document.getElementById("chicken-price");
      } else {
        if (modalBody.querySelector("input"))
          modalBody.querySelector("input").remove();
      }
    });
  } else if (
    assetObj.type.toLowerCase() === "batch" &&
    assetObj.childesCount > 0 &&
    assetObj.price == 0 &&
    currUserRole == roles.wholeSaler
  ) {
    selectStatus.insertAdjacentHTML(
      `beforeend`,
      `
    <option class="${readyToSale.color}" value="${readyToSale.name}">${readyToSale.name}</option>
    `
    );

    selectStatus.addEventListener("change", (e) => {
      if (e.target.value == readyToSale.name) {
        modalBody.insertAdjacentHTML(
          "beforeend",
          `
            <input type='number' id='chicken-price' name='chicken-price' class='form-control mt-2' placeholder='Enter the price' require />
        `
        );

        chickenPrice = document.getElementById("chicken-price");
      } else {
        if (modalBody.querySelector("input"))
          modalBody.querySelector("input").remove();
      }
    });
  }
};

const minimizeDateStr = (dateStr) => {
  let a = dateStr.replace("UTC", "");
  return a.substring(0, a.lastIndexOf("+") - 1);
};

const setModalOnMetadataView = () => {
  modalBody.innerHTML = "";
  modalTitle.textContent = "Metadata";

  let assetObj;
  if (assetsOfBatch.length > 0) {
    assetObj = assetsOfBatch.filter((asset) => asset.id === ChickenID)[0];
  } else {
    assetObj = userData.filter((asset) => asset.id === ChickenID)[0];
  }

  if (assetObj.attrs.length > 0) {
    modalBody.insertAdjacentHTML(
      "beforeend",
      `
        <table
        class="table table-bordered table-striped"
        style="max-width: 100%"
        id="metadata-list-table"
      >
      <thead>
      <tr>
          <th scope="col">attribute</th>
          <th scope="col">Value</th>
          <th scope="col">Instruction</th>
      </tr>
      </thead>
        <tbody id="metadata-list"></tbody>
      </table>
        `
    );

    let metaDataList = document.getElementById("metadata-list");

    assetObj.attrs.forEach((item) => {
      metaDataList.insertAdjacentHTML(
        "beforeend",
        `                
              <td>${item.key}</td>
              <td>${item.value}</td>
              <td>${item.instruction}</td>
            `
      );
    });
  } else {
    modalBody.insertAdjacentHTML(
      "beforeend",
      `
      <h3>There's No data</h3>
    `
    );
  }
  save.style.display = "none";
};

const setModalOnView = () => {
  modalBody.innerHTML = "";
  modalTitle.textContent = "View";

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  fetch(getAssetHistoryURL + `?id=${ChickenID}`, config)
    .then((res) => res.json())
    .then((data) => {
      let results = data.result;

      results.forEach((item) => {
        modalBody.insertAdjacentHTML(
          "afterbegin",
          `
                    <!-- Timelime example  -->

                        <!-- The time line -->
                        <div class="timeline">
                          <!-- timeline time label -->
                          <div class="time-label1">
                            <span class="bg-warning">Asset-ID:${item.asset.SerialNumber.substring(
                              0,
                              10
                            )}</span>
                            </div> 

                          <!-- /.timeline-label -->
                          <!-- timeline item -->
                          <div>
                            <!-- <i class="fas fa-envelope bg-blue"></i> -->
                            <div class="timeline-item">
                              <span class="time">
                              <i class="fas fa-clock"></i> ${minimizeDateStr(
                                item.timestamp
                              )}</span>
                              
                              ${
                                item.asset.status !== ""
                                  ? `Status: ${item.asset.status}<br/>`
                                  : ""
                              }
                              ${
                                item.asset.price !== 0
                                  ? `Price: ${item.asset.price} <br />`
                                  : ""
                              }

                              Owner: ${item.asset.owner}
                              <br/>

                              ${
                                item.asset.forSale
                                  ? `For Sale: ${item.asset.forSale}<br/>`
                                  : ""
                              }
                              
                              Asset-Step: "${item.asset.txType}"
                            
                            <!-- loop -->
                            
                            <!-- loop -->
                             
                            </div>
                          </div>
                          <!-- END timeline item -->
                          <!-- timeline item -->
                         
                          
                         
                              
                          <!-- END timeline item -->
                         
                        </div>
                      </div>
                      <!-- /.col -->
                    </div>
                    </div>
                    </div>
                    <!-- /.timeline -->
                    
          
                          `
        );
      });
    });

  save.style.display = "none";
};

const setModalOnInfo = () => {
  modalSignal = "INFO";
  save.style.display = "block";

  modalBody.innerHTML = "";
  modalTitle.textContent = "Info";

  const inputData = [
    {
      name: "Production Date",
      value: "produced-date",
    },
    {
      name: "Type Of Product",
      value: "type",
    },
    {
      name: "Materials",
      value: "material",
    },
  ];

  modalBody.insertAdjacentHTML(
    "beforeend",
    `<div class="form-group" id="info-data">
        <label>Info Option</label>
        <select class="custom-select mb-3" id="info-select">
        </select>
        <div id='meta-select-change'>
        <label for="producedDate">Produced Date</label>
        <input type="date" class="form-control" id="meta--produced-date" placeholder="choose a date">
        </div>
    </div>`
  );

  const infoSelect = document.getElementById("info-select");
  const selectChange = document.getElementById("meta-select-change");
  metaProducedDate = document.getElementById("meta--produced-date");
  selectedMetaDataVal = "produced-date";

  inputData.forEach((item) => {
    infoSelect.insertAdjacentHTML(
      "afterbegin",
      `<option value="${item.value}">${item.name}</option>`
    );
  });

  infoSelect.addEventListener("change", (e) => {
    selectedMetaDataVal = infoSelect.options[infoSelect.selectedIndex].value;
    selectChange.innerHTML = "";
    switch (selectedMetaDataVal) {
      case "produced-date":
        selectChange.insertAdjacentHTML(
          "beforeend",
          `
          <label for="producedDate">Produced Date</label>
          <input type="date" class="form-control" id="meta--produced-date" placeholder="choose a date">
            `
        );

        metaProducedDate = document.getElementById("meta--produced-date");
        return;

      case "type":
        selectChange.insertAdjacentHTML(
          "beforeend",
          `
            <label for="assetType">Type</label>
            <input type="text" class="form-control" id="meta--type" placeholder="Enter type of asset">
              `
        );

        metaType = document.getElementById("meta--type");
        return;

      case "material":
        selectChange.insertAdjacentHTML(
          "beforeend",
          `
            <label for="material">Material</label>
            <input type="text" class="form-control" id="meta--material" placeholder="Enter consumed material">
              `
        );
        metaMaterial = document.getElementById("meta--material");
        return;
    }
  });

  //   metaProducedDate = document.getElementById("meta--produced-date");
  //   metaType = document.getElementById("meta--type");
  //   metaMaterial = document.getElementById("meta--material");
};

const getSelectedBatch = () => {
  let batchSelect = document.getElementById("batch-select");
  let selectedBatch = batchSelect.options[batchSelect.selectedIndex].value;
  return [
    selectedBatch.substring(0, selectedBatch.lastIndexOf("-")),
    Number(
      selectedBatch.substring(
        selectedBatch.lastIndexOf("-") + 1,
        selectedBatch.length
      )
    ),
  ];
};

const setModalOnAddToBatch = () => {
  save.style.display = "block";

  modalSignal = "ADD_TO_BATCH";
  modalBody.innerHTML = "";
  modalTitle.textContent = "Add Asset To Batch";
  let batchIDs = userData.filter(
    (item) => item.type.toLowerCase() === "batch" && item.childesCount < 10
  );

  modalBody.insertAdjacentHTML(
    "beforeend",
    `
    <div class="form-group">
        <label>Batch</label>
        <select class="custom-select" id="batch-select">
        </select>
    </div>`
  );

  let batchSelect = document.getElementById("batch-select");
  if (batchIDs.length > 0) {
    batchIDs.forEach((item) => {
      batchSelect.insertAdjacentHTML(
        "afterbegin",
        `
        <option value="${item.id}-${item.childesCount}">${item.SerialNumber} - count: ${item.childesCount}</option>
        `
      );
    });
  }
};

const getSelectedValueForStatus = () => {
  selectStatus = document.getElementById("status-select");
  let userSelectedValue =
    selectStatus.options[selectStatus.selectedIndex].value;
  return userSelectedValue;
};

save.addEventListener("click", (e) => {
  // save.setAttribute("disabled", true);

  switch (modalSignal) {
    case "EDIT":
      let selectedVal = getSelectedValueForStatus();

      if (chickenPrice !== null) {
        if (chickenPrice.value !== "") {
          if (assetsToAddBatch.length > 0) {
            assetsToAddBatch.forEach((item) => {
              setChickenForSaleReq(item, Number(chickenPrice.value.trim()));
            });
          } else {
            setChickenForSaleReq(ChickenID, Number(chickenPrice.value.trim()));
          }
        }
        chickenPrice.value = "";
      } else {
        // $("#modal-default").modal("toggle");
        modalBody.innerHTML = `
            <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            </div>
          </div>
            `;

        let userIndex = userData.findIndex(
          (obj, index) => obj.id === ChickenID
        );
        let colorStatus = AssetStatus.filter(
          (obj) => obj.name === selectedVal
        )[0];

        userData[userIndex].status = selectedVal;
        userData[userIndex].statusColor = colorStatus.color;
        // console.log(userData[userIndex].type);
        changeStatusColorOnServer(
          ChickenID,
          selectedVal,
          userData[userIndex].type
        );

        itemTable.innerHTML = "";
        getAllChickens(userData);
        getAllBatches(userData);
      }
      return;

    case "INFO":
      metaProducedDate = metaProducedDate?.value;
      metaType = metaType?.value;
      metaMaterial = metaMaterial?.value;
      selectedMetaDataVal;

      let metaDataOpt = [metaProducedDate, metaType, metaMaterial].filter(
        (item) => item !== undefined && item !== ""
      )[0];

      modalBody.innerHTML = `
      <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
      </div>
    </div>
      `;
      if (assetsToAddBatch.length > 0) {
        assetsToAddBatch.forEach((item, index) =>
          addMetaData(
            item,
            selectedMetaDataVal,
            metaDataOpt,
            "No Instruction",
            index
          )
        );
      } else {
        let assetType = userData.filter(
          (item) => item.id === ChickenID && item.type.toLowerCase() === "batch"
        );

        if (assetType.length > 0) {
          addMetaDataToBatch(
            ChickenID,
            selectedMetaDataVal,
            metaDataOpt,
            "No Instruction"
          );
        } else {
          addMetaData(
            ChickenID,
            selectedMetaDataVal,
            metaDataOpt,
            "No Instruction",
            1
          );
        }
      }
      return;

    case "ADD_TO_BATCH":
      // todo: patch required
      let [selectedBatchId, count] = getSelectedBatch();
      if (assetsToAddBatch.length > 0) {
        if (Number(count) + assetsToAddBatch.length <= 10) {
          addSelectedAssetToBatch(assetsToAddBatch, selectedBatchId);
        } else {
          showModal(false, "The batch should only have 10 item", "");
        }
      } else addSelectedAssetToBatch([ChickenID], selectedBatchId);
      return;

    case "DELETE":
      save.textContent = "Save";
      if (assetsToAddBatch.length > 0) {
        removeAssetFromBatch(assetsToAddBatch, batchId_);
      } else {
        removeAssetFromBatch([ChickenID], batchId_);
      }
      return;

    case "DELIVERY":
      let selectedValDel = getSelectedValueForStatus();
      modalBody.innerHTML = `
      <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
      </div>
    </div>
      `;
      let assetIndex = assetDataStatus.findIndex((obj) => obj.id === ChickenID);

      // set item table after change
      assetDataStatus[assetIndex].status = selectedValDel;
      assetDataDeliveryStatusForCompanies.push(assetDataStatus[assetIndex]);

      setItemTable(assetDataDeliveryStatusForCompanies);

      // clear asset table from asset
      assetDataStatus.splice(assetIndex, 1);

      changeStatusColorOnServer(ChickenID, selectedValDel, "delivery");
      // itemTable.innerHTML = "";
      getDeliveryAssetsByStatus(assetDataStatus);
  }
});

const getChickens = async () => {
  const res = await fetch(getAssetsOwnerURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  let colorizedData = giveStatusColor(data);

  return colorizedData.result;
};

const getAssets = async () => {
  const res = await fetch(getAssetsURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data.message;
};

const searchData = (data = [], keyword = "") => {
  if (keyword === "" || keyword === null || keyword === undefined) return data;

  const filterFunc = (obj) => {
    if (
      obj.SerialNumber.includes(keyword) ||
      obj.owner.includes(keyword) ||
      obj.status.includes(keyword) ||
      obj.price.toString().includes(keyword)
    )
      return obj;
    else return null;
  };
  let searchedData = data.filter(filterFunc);

  return searchedData;
};

searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    table.innerHTML = "";
    const info = await getChickens();
    let data = searchData(info, e.target.value);
    getAllChickens(data);
  }
});

const carveOutPrice = (data = [], key) => {
  let filteredData = data.filter((obj) => obj.id === key);
  if (filteredData.length === 0) return 0;
  return filteredData[0].price;
};

const addAssetToList = (assetId) => {
  if (assetsToAddBatch.includes(assetId)) {
    assetsToAddBatch = assetsToAddBatch.filter((item) => item !== assetId);
  } else {
    assetsToAddBatch.push(assetId);
  }
};

const setItemTable = (data = []) => {
  if (currUserRole === roles.globalDelivery) {
    data = data.filter(
      (item) => item.status.toLowerCase() == deliverd.name.toLowerCase()
    );
  }

  itemTable.innerHTML = "";
  itemTable.insertAdjacentHTML(
    "beforeend",
    `
  <thead>
  <tr id="cols-section">
      <th scope="col">
          <input
            type="checkbox"
            value=""
            id="asset-check-box"
          />
          <label for="check1"></label>
        </th>

        <th scope="col">Serial No.</th>
        
        <th scope="col">Owner</th>
        <th scope="col">Buyer</th>
        <th scope="col">status</th>

      </tr>
    </thead>
    <tbody id="item-list"></tbody>
  `
  );

  let itemTableList = document.getElementById("item-list");

  data.forEach((asset, index) =>
    itemTableList.insertAdjacentHTML(
      `beforeend`,
      `
      <tr>
      <th scope="row">
                <input type="checkbox" value="${index}" id="asset-checkbox" onClick="">
                <label for="check1"></label>
          </th>
          <td>${asset.SerialNumber}</td>
          <td>${asset.owner} </td>
          <td>${asset.buyer}</td>
          <td>
            <span class="badge ${asset.statusColor}">${asset.status}</span>
          </td>

      </tr>
  `
    )
  );
};

function getAllChickens(data = []) {
  const filterItemKey = "Chicken";
  data = data.filter((item) => item.type === filterItemKey || item.type === "");
  itemTable.innerHTML = "";
  itemTable.insertAdjacentHTML(
    "beforeend",
    `
  <thead>
  <tr>
    <th scope="col">
      <input
        type="checkbox"
        value=""
        id="asset-check-box"
      />
      <label for="check1"></label>
    </th>
    <th scope="col">ID</th>
    
    <th scope="col">Price</th>
    <th scope="col">status</th>
    <th scope="col"></th>
  </tr>
</thead>
<tbody id="book-list"></tbody>
  `
  );

  let itemTableList = document.getElementById("book-list");

  data.forEach((chicken, index) => {
    // console.log(data);
    itemTableList.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
          <th scope="row">
                <input type="checkbox" value="${index}" id="asset-checkbox" onClick="addAssetToList('${
        chicken.id
      }')">
                <label for="check1"></label>
          </th>
          <td>${chicken.SerialNumber}</td>
        
        <td id='chicken-price-${index}'>${chicken.price}</td>
        <td>
        <span class="badge ${chicken.statusColor}">${
        chicken.status ? chicken.status : "Produced"
      }</span>
        </td>
        <td>
        <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        chicken.id
      }'); setModalOnView();" href="#">
        <i class="fa fa-history">
        </i>
    </a>
    <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        chicken.id
      }'); setModalOnMetadataView();" href="#">
      <i class="fas fa-eye">
      </i>
  </a>
    <a class="btn btn-default btn-sm" id="edit-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal('${
        chicken.id
      }', '${chicken.id}'); setModalonEdit()" href="#">
        <i class="fas fa-pencil-alt">
        </i>
    </a>
  
    <a class="btn btn-primary btn-sm" id="add-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        chicken.id
      }'); setModalOnAddToBatch()" href="#">
        <i class="fas fa-plus">
    </i>
    </a>
    <a class="btn btn-info btn-sm" id="info-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        chicken.id
      }'); setModalOnInfo();" href="#">
      <i class="fas fa-info"></i>
    </a>
    </td>
      </tr>
       `
    );
    // usernameSidebar.textContent = carveOutUsername(chicken.owner);
  });
}

const getAllBatches = (data = []) => {
  // clear the table befor adding new data-row into the table
  batchListTable.innerHTML = "";
  batchListTable.insertAdjacentHTML(
    "beforeend",
    `
    <thead>
    <tr>
      <th scope="col">
        <input
          type="checkbox"
          value=""
          id="batch-check-box"
        />
        <label for="check1"></label>
      </th>
      <th scope="col">ID</th>
      <th scope="col">Owner</th>
      <th scope="col">Count</th>
      <th scope="col">Price</th>
      <th scope="col">status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="batch-list"></tbody>
  `
  );
  let batchListAdded = document.getElementById("batch-list");
  // TODO: add if for not successful request
  const batchType = "batch";
  const statusType = "warehouse";

  // filter chickens that the type == 'batch'
  data = data.filter(
    (item) =>
      item.type.toLowerCase() == batchType &&
      item.status.toLowerCase() !== statusType
  );

  data.forEach((batch, index) =>
    batchListAdded.insertAdjacentHTML(
      "afterend",
      `
    
    <tr>
    <th scope="row">
          <input type="checkbox" value="${index}" id="batch-checkbox">
          <label for="check1"></label>
    </th>
      <td>${batch.SerialNumber}</td>
      <td>${batch.owner} </td>
      <td>${batch.childesCount}</td>
      <td>${batch.price}</td>
      <td>
        <span class="badge ${batch.statusColor}">${
        batch.status ? batch.status : "Produced"
      }</span>
        </td>
      
      <td>
      <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        batch.id
      }'); setModalOnView();" href="#">
      <i class="fa fa-history">
      </i>
  </a>
    <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        batch.id
      }'); setModalOnMetadataView();" href="#">
    <i class="fas fa-eye">
    </i>
  </a>
  <a class="btn btn-default btn-sm" id="edit-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal('${
        batch.id
      }', '${batch.id}'); setModalonEdit()" href="#">
      <i class="fas fa-pencil-alt">
      </i>
  </a>
  <a class="btn btn-info btn-sm" id="info-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        batch.id
      }'); setModalOnInfo();" href="#">
  <i class="fas fa-info"></i>
</a>
  </td>
    </tr>
    `
    )
  );
};

function openEditModal(index, chickId) {
  userID = index;
  ChickenID = chickId;
}

assetCheckBox.addEventListener("click", (e) => {
  if (checkedAll) {
    checkedAll = !checkedAll;
    selectAll();
  } else {
    checkedAll = !checkedAll;
    UnSelectAll();
  }
});

batchCheckBox.addEventListener("click", (e) => {
  if (checkedAll) {
    data = userData.filter((item) => item.type === "");
    assetsToAddBatch = [];
    data.forEach((item) => assetsToAddBatch.push(item.id));
    checkedAll = !checkedAll;
    selectAll();
  } else {
    assetsToAddBatch = [];
    checkedAll = !checkedAll;
    UnSelectAll();
  }
});

function selectAll() {
  var items = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < items.length; i++) {
    if (items[i].type == "checkbox") {
      items[i].checked = true;
    }
  }
}

function UnSelectAll() {
  var items = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < items.length; i++) {
    if (items[i].type == "checkbox") {
      items[i].checked = false;
    }
  }
}

let username = null;
const carveOutUsername = (username) => {
  return username.split("@")[1];
};

// start api get token for userlogin
const getToken = () => {
  fetch(getTokenURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error !== "null") {
        // for all page
        inventorySidebar.textContent = data.result?.amount;
        blockedInvenory.textContent = data.result?.blockAmount;
        setRoleAccess(data.result.user);
      }
    });
};
// end api get token for userlogin

// start get api image for userprofile
const setProfile = () => {
  fetch(getImageUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        profileImage.setAttribute("src", data.message[0].imageUrl);
      }
    });
};
// end get api image for userprofile

//start get api role for access and username
const setRoleAccess = (currUser) => {
  fetch(getUsersRoleURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        let userRole = data.message.filter(
          (userRoleObj) => userRoleObj.username === currUser
        )[0];

        usernameSidebar.textContent = userRole.nickname;
        setProfile();

        setTheTable(userRole.role);
        switch (userRole.role) {
          case "Factory":
            listSection.style.display = "block";
            productionSection.style.display = "block";
            historySection.style.display = "block";
            currUserRole = roles.factory;
            return;

          case "Warehouse":
            warehouseSection.style.display = "block";
            shopSection.style.display = "block";
            requestSection.style.display = "block";
            window.location.replace("./Warehouse.html");
            currUserRole = roles.warehouse;
            metaMaskDropdownSection.style.display = "flex";
            return;

          case "Wholesaler":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            historySection.style.display = "block";
            requestSection.style.display = "block";
            currUserRole = roles.wholeSaler;
            return;

          case "Retailer":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            historySection.style.display = "block";
            requestSection.style.display = "block";
            currUserRole = roles.retailer;
            return;

          case "LocalDelivery":
            listSection.style.display = "block";
            requestSection.style.display = "block";
            currUserRole = roles.localDelivery;
            return;

          case "GlobalDelivery":
            listSection.style.display = "block";
            requestSection.style.display = "block";
            currUserRole = roles.globalDelivery;
            return;

          case "Customer":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            currUserRole = roles.customer;
            metaMaskDropdownSection.style.display = "flex";
            return;
        }
      }
    });
};
//end get api role for access and username

const replaceAssetsOfBatch = (data = [], batchId) => {
  batchListTable.innerHTML = "";

  batchListTable.insertAdjacentHTML(
    "beforeend",
    `
    <thead>
    <tr>
      <th scope="col">
        <input
          type="checkbox"
          value=""
          id="batch-check-box"
        />
        <label for="check1"></label>
      </th>
      <th scope="col">ID</th>
      <th scope="col">Owner</th>
      <th scope="col">Count</th>
      <th scope="col">Price</th>
      <th scope="col">status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="batch-list"></tbody>
  `
  );

  let batchListAdded = document.getElementById("batch-list");

  data.forEach((asset, index) => {
    batchListAdded.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
    <th scope="row">
          <input type="checkbox" value="${index}" id="asset-checkbox" onClick="addAssetToList('${
        asset.id
      }')">
          <label for="check1"></label>
    </th>
      <td>${asset.SerialNumber}</td>
      <td>${asset.owner} </td>
      <td>${asset.childesCount} </td>
      <td id='asset-price-${index}'>${carveOutPrice(assets, asset.id)}</td>
      <td>
      <span class="badge ${asset.statusColor}">${
        asset.status ? asset.status : "Produced"
      }</span>
      </td>
      <td>
      <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        asset.id
      }'); setModalOnView();" href="#">
      <i class="fa fa-history">
      </i>
  </a>
  <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        asset.id
      }'); setModalOnMetadataView();" href="#">
    <i class="fas fa-eye">
    </i>
  </a>
  <a class="btn btn-default btn-sm" id="edit-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        asset.id
      }'); setModalonEdit()" href="#">
      <i class="fas fa-pencil-alt">
      </i>
  </a>

  <a class="btn btn-default btn-sm" id="delete-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        asset.id
      }'); setModalOnDeleteAssetsOfBatch()" href="#">
      <i class="fas fa-trash" style="color: #ff4d4d">
  </i>
  </a>
  <a class="btn btn-info btn-sm" id="info-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        asset.id
      }'); setModalOnInfo();" href="#">
    <i class="fas fa-info"></i>
  </a>
  </td>
    </tr>
     `
    );
  });
};

const getAssetsOfBatch = (batchId) => {
  batchListTable.innerHTML = "";

  batchListTable.insertAdjacentHTML(
    "beforeend",
    `
    <thead>
    <tr>
      <th scope="col">
        <input
          type="checkbox"
          value=""
          id="batch-check-box"
        />
        <label for="check1"></label>
      </th>
      <th scope="col">ID</th>
      <th scope="col">Owner</th>
      <th scope="col">Count</th>
      <th scope="col">Price</th>
      <th scope="col">status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="batch-list"></tbody>
  `
  );

  let batchListAdded = document.getElementById("batch-list");

  fetch(getBatchAssetsURL + `?batchId=${batchId}`, {
    headers: headerReq,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.result.length > 0) {
        assetsOfBatch = data.result;

        deleteAssetBtn.style.display = "inline-block";
        batchId_ = batchId;

        let colorizedData = giveStatusColor(data);

        colorizedData.result.forEach((chicken, index) => {
          batchListAdded.insertAdjacentHTML(
            "beforeend",
            `
          <tr>
          <th scope="row">
                <input type="checkbox" value="${index}" id="asset-checkbox" onClick="addAssetToList('${
              chicken.id
            }')">
                <label for="check1"></label>
          </th>
            <td>${chicken.SerialNumber}</td>
            <td>${chicken.owner} </td>
            <td>${chicken.childesCount} </td>
            <td id='chicken-price-${index}'>${carveOutPrice(
              assets,
              chicken.id
            )}</td>
            <td>
            <span class="badge ${chicken.statusColor}">${
              chicken.status ? chicken.status : "Produced"
            }</span>
            </td>
            <td>
            <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
              chicken.id
            }'); setModalOnView();" href="#">
            <i class="fa fa-history">
            </i>
        </a>
        <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
              chicken.id
            }'); setModalOnMetadataView();" href="#">
          <i class="fas fa-eye">
          </i>
        </a>
        <a class="btn btn-default btn-sm" id="edit-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
              chicken.id
            }'); setModalonEdit()" href="#">
            <i class="fas fa-pencil-alt">
            </i>
        </a>

        <a class="btn btn-default btn-sm" id="delete-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
              chicken.id
            }'); setModalOnDeleteAssetsOfBatch()" href="#">
            <i class="fas fa-trash" style="color: #ff4d4d">
        </i>
        </a>
        <a class="btn btn-info btn-sm" id="info-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
              chicken.id
            }'); setModalOnInfo();" href="#">
          <i class="fas fa-info"></i>
        </a>
        </td>
          </tr>
           `
          );
        });
      } else {
        batchListAdded.insertAdjacentHTML(
          "beforeend",
          `
        <h3> No Asset Found </h3>
      `
        );
      }
    });
};

const setBatchIdDropDown = (data = []) => {
  console.log(data);
  const batchType = "batch";
  data = data.filter(
    (item) =>
      item.type.toLowerCase() == batchType &&
      item.status.toLowerCase() !== warehouse.name.toLowerCase()
  );

  data.forEach((item, index) =>
    batchIds.insertAdjacentHTML(
      "afterbegin",
      `
    <option value=${item.id}>${item.SerialNumber}</option>
  `
    )
  );
};

batchIds.addEventListener("change", (e) => {
  let selectedBatch = batchIds.options[batchIds.selectedIndex].value;

  if (selectedBatch === "all") {
    getAllBatches(userData);
    assetsOfBatch = [];
  } else getAssetsOfBatch(selectedBatch);
});

let assetDataStatus = null;
let assetDataBuyer = [];
let assetDataOwnedBuyer = [];
let confirmBuyerBtn = null;
let assetDataDeliveryStatusForCompanies = null;

const setModalonEditDelivery = () => {
  modalSignal = "DELIVERY";
  save.style.display = "block";
  modalBody.innerHTML = "";
  modalTitle.textContent = "Change status";
  modalBody.insertAdjacentHTML(
    "beforeend",
    `
    <div class='container'>
      <select class="form-control" id="status-select">
        <option class="${wasted.color}" value="${wasted.name}">${wasted.name}</option>
        </select>
        </div>
        `
  );

  selectStatus = document.getElementById("status-select");
  if (currUserRole == roles.localDelivery) {
    selectStatus.insertAdjacentHTML(
      "beforeend",
      `
    <option class="${readyToGlobalDelivery.color}" value="${readyToGlobalDelivery.name}">${readyToGlobalDelivery.name}</option>
    `
    );
  } else if (currUserRole == roles.globalDelivery) {
    selectStatus.insertAdjacentHTML(
      "beforeend",
      `
    <option class="${deliverd.color}" value="${deliverd.name}">${deliverd.name}</option>
    `
    );
  }
};

const getDeliveryAssets = async (status) => {
  const res = await fetch(`${getAssetsByStatusURL}?status=${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  let colorizedData = giveStatusColor(data);

  return colorizedData.result;
};

const getDeliveryAssetsByStatus = (data = []) => {
  // clear the table befor adding new data-row into the table
  batchListTable.innerHTML = "";
  batchListTable.insertAdjacentHTML(
    "beforeend",
    `
    <thead>
    <tr>
      <th scope="col">
        <input
          type="checkbox"
          value=""
          id="batch-check-box"
        />
        <label for="check1"></label>
      </th>
      <th scope="col">Serial No.</th>
      <th scope="col">Owner</th>
      <th scope="col">Buyer</th>
      <th scope="col">status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="batch-list"></tbody>
  `
  );
  let batchListAdded = document.getElementById("batch-list");

  data.forEach((asset, index) =>
    batchListAdded.insertAdjacentHTML(
      "afterend",
      `
    <tr>
      <th scope="row">
            <input type="checkbox" value="${index}" id="asset-checkbox">
            <label for="check1"></label>
      </th>
        <td>${asset.SerialNumber}</td>
        <td>${asset.owner} </td>
        <td>${asset.buyer}</td>
        <td>
          <span class="badge ${asset.statusColor}">${asset.status}</span>
        </td>
        <td>
          <a class="btn btn-default btn-sm" id="edit-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal('${asset.id}', '${asset.id}'); setModalonEditDelivery()" href="#">
              <i class="fas fa-pencil-alt"></i>
          </a>
        </td>
    </tr>
    `
    )
  );
};

const getBuyerAssets = async () => {
  const res = await fetch(getAssetsByBuyerURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  let colorizedData = giveStatusColor(data);
  return colorizedData.result;
};

const getBuyerPaidAsset = async () => {
  const res = await fetch(getAssetsOwnerURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  let colorizedData = giveStatusColor(data);
  return colorizedData.result;
};

const confirmReceived = (idx) => {
  // set loading
  // confirmBuyerBtn = document.getElementById(recvBtnId);
  // confirmBuyerBtn.innerHTML = `
  //     <div class="d-flex justify-content-center">
  //     <div class="spinner-border" role="status">
  //     </div>
  //   </div>
  // `;
  console.log("start take delivey");
  const data = {
    id: idx,
  };

  fetch(takeDeliveryURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      res.json();
      console.log("json");
    })
    .then((data) => {
      console.log("ready to change status");
      changeStatusColorOnServer(idx, paid.name, "buyer");
    });
};

// Receipt section
const setTableRowsForBuyerAsset = (data = []) => {
  // clear the table befor adding new data-row into the table
  batchListTable.innerHTML = "";
  batchListTable.insertAdjacentHTML(
    "beforeend",
    `
    <thead>
    <tr>
      <th scope="col">
        <input
          type="checkbox"
          value=""
          id="batch-check-box"
        />
        <label for="check1"></label>
      </th>
      <th scope="col">Serial No.</th>
      <th scope="col">Owner</th>
      <th scope="col">Price</th>
      <th scope="col">status</th>
      <th scope="col">History</th>
    </tr>
  </thead>
  <tbody id="batch-list"></tbody>
  `
  );
  let batchListAdded = document.getElementById("batch-list");

  data.forEach((asset, index) => {
    batchListAdded.insertAdjacentHTML(
      "afterend",
      `
    <tr>
      <th scope="row">
            <input type="checkbox" value="${index}" id="asset-checkbox">
            <label for="check1"></label>
      </th>
        <td>${asset.SerialNumber}</td>
        <td>${asset.owner} </td>
        <td>${asset.price}</td>
        <td>
          <span class="badge ${asset.statusColor}">${asset.status}</span>
        </td>
        <td id='confirm-btn-${index}'>
            <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${asset.id}'); setModalOnView();" href="#">
              <i class="fa fa-history">
              </i>
            </a>
        
        </td>
    </tr>
    `
    );

    if (asset.status == deliverd.name) {
      var confirmBtnRowTable = document.getElementById(`confirm-btn-${index}`);
      confirmBtnRowTable.insertAdjacentHTML(
        "beforeend",
        `
            <a class='btn btn-secondary btn-sm' id='confirm-${index}' onclick="transferToken(${asset.price}, '${asset.id}','confirm-${index}')">Received</a>
        `
      );
    }
  });
};

// paids section
const setTheTableForConfirmedBuy = (data = []) => {
  itemTable.innerHTML = "";
  itemTable.insertAdjacentHTML(
    "beforeend",
    `
    <thead>
    <tr>
      <th scope="col">
        <input
          type="checkbox"
          value=""
          id="batch-check-box"
        />
        <label for="check1"></label>
      </th>
      <th scope="col">Serial No.</th>
      <th scope="col">Owner</th>
      <th scope="col">status</th>
      <th scope="col">History</th>
    </tr>
  </thead>
<tbody id="book-list"></tbody>
  `
  );

  let itemTableList = document.getElementById("book-list");

  data.forEach((asset, index) => {
    itemTableList.insertAdjacentHTML(
      "afterend",
      `
      <tr>
        <th scope="row">
              <input type="checkbox" value="${index}" id="asset-checkbox">
              <label for="check1"></label>
        </th>
        <td>${asset.SerialNumber}</td>
        <td>${asset.owner} </td>
        <td>
          <span class="badge ${asset.statusColor}">${asset.status}</span>
        </td>
        <td>
        <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${asset.id}'); setModalOnView();" href="#">
          <i class="fa fa-history">
          </i>
      </a>
        
        </td>
    </tr>
      `
    );
  });
};

// set table status for LD/GD
const getAllAssetsForDelivery = async (type = "LD") => {
  const res = await fetch(
    `${type == "LD" ? getAllAssetsByLDURL : getAllAssetsByGDURL}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  let colorizedData = giveStatusColor(data);

  return colorizedData.result;
};

const hideAllTopBtnTable = () => {
  infoBtn.forEach((btn) => (btn.style.display = "none"));
  penBtn.forEach((btn) => (btn.style.display = "none"));
  plusBtn.forEach((btn) => (btn.style.display = "none"));
  batchIds.style.display = "none";
};

const showAllTopBtnTable = () => {
  tabsSection.style.display = "flex";
  infoBtn.forEach((btn) => (btn.style.display = "inline-block"));
  penBtn.forEach((btn) => (btn.style.display = "inline-block"));
  plusBtn.forEach((btn) => (btn.style.display = "inline-block"));
  batchIds.style.display = "block";
};

async function setTheTable(userRole) {
  if (userRole == roles.localDelivery || userRole == roles.globalDelivery) {
    showAllTopBtnTable();
    // set the tabs display section
    tabsSection.style.display = "flex";
    // first tab
    batchSection.textContent = "Accepted";
    // second tab
    itemSection.textContent = "Previous Assets";

    penBtn[0].style.display = "inline-block";

    let role = localDelivery.name;
    if (userRole == roles.globalDelivery) role = globalDelivery.name;

    // set asset table
    const assetDataByStatus = await getDeliveryAssets(role);
    assetDataStatus = assetDataByStatus;
    getDeliveryAssetsByStatus(assetDataByStatus);

    // set status table
    let type = "LD";
    if (userRole == roles.globalDelivery) type = "GD";
    const assetStatusForDelivery = await getAllAssetsForDelivery(type);
    assetDataDeliveryStatusForCompanies = assetStatusForDelivery;
    setItemTable(assetStatusForDelivery);
  } else if (userRole == roles.customer) {
    tabsSection.style.display = "flex";
    batchSection.textContent = "Receipt";
    itemSection.textContent = "Paids";
    // set receive all btn
    penBtn[0].style.display = "inline-block";
    penBtn[0].innerHTML = "";
    penBtn[0].textContent = "Receive All";
    penBtn[0].setAttribute("id", "receive-all-assets");
    penBtn[0].classList.remove("btn-sm");
    penBtn[0].classList.add("btn-md");

    const buyerAssets = await getBuyerAssets();
    assetDataBuyer = buyerAssets;
    setTableRowsForBuyerAsset(buyerAssets);

    const buyerOwnedAssets = await getBuyerPaidAsset();
    assetDataOwnedBuyer = buyerOwnedAssets;
    setTheTableForConfirmedBuy(buyerOwnedAssets);
  } else {
    showAllTopBtnTable();
    batchSection.textContent = "Batch";
    itemSection.textContent = "Item";

    const info = await getChickens();
    userData = info;
    assets = info;
    getAllChickens(info);
    getAllBatches(info);
    setBatchIdDropDown(info);
  }
}

// connect to metamask wallet
let account;
metaMaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
    account = accounts[0];
    walletAddr.textContent =
      account.substring(0, 10) +
      "..." +
      account.substring(account.length - 10, account.length - 1);
    // console.log(account);

    ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((result) => {
        let wei = parseInt(result, 16);
        let balance = wei / 10 ** 18;
        walletBalance.textContent = String(balance).substring(0, 5) + " ETH";
        // console.log(balance + "ETH");
      });
  });
  metaMaskBtn.setAttribute("disabled", true);
  metaMaskBtn.textContent = "Connected";
});

// todo: const transferToken(value, idx, recvBtnId, to) -> pass to dynamically
const transferToken = (value, idx, recvBtnId) => {
  const to = "0xB93a5aeE6dE7FD76008203000399FbDaf84AEB25";
  // set loading
  confirmBuyerBtn = document.getElementById(recvBtnId);
  confirmBuyerBtn.innerHTML = `
      <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
      </div>
    </div>
  `;
  console.log(value);
  value = Number(value);
  value = value * Math.pow(10, 18);
  value = value.toString(16); // to hex

  let transactionParam = {
    to: to,
    from: account,
    value: value,
  };

  function checkTransactionconfirmation(txhash) {
    let checkTransactionLoop = () => {
      return ethereum
        .request({ method: "eth_getTransactionReceipt", params: [txhash] })
        .then((r) => {
          if (r != null) return "confirmed";
          else return checkTransactionLoop();
        });
    };
    return checkTransactionLoop();
  }

  ethereum
    .request({ method: "eth_sendTransaction", params: [transactionParam] })
    .then((txhash) => {
      console.log(txhash);

      checkTransactionconfirmation(txhash).then((r) => {
        console.log(r);
        if (r == "confirmed") {
          
          // buyer section in changeStatusColorOnServer func -> todo: temp solution for the bug
          let assetObj = assetDataBuyer.find((obj) => obj.id === idx); // idx = assetId, assetDataBuyer -> Receipt list
          assetObj.owner = assetObj.buyer;
          let assetIndex = assetDataBuyer.findIndex((obj) => obj.id === idx);

          assetObj.status = paid.name;
          assetObj.statusColor = paid.color; 
          assetDataOwnedBuyer.push(assetObj); // assetDataOwnedBuyer -> paids list

          confirmBuyerBtn.remove();

          assetDataBuyer.splice(assetIndex, 1);
          setTableRowsForBuyerAsset(assetDataBuyer); // -> Receipts table reset
          setTheTableForConfirmedBuy(assetDataOwnedBuyer); // -> Paids table reset
          //
          
          confirmReceived(idx);

          card.insertAdjacentHTML(
            "beforebegin",
            `
        <div class="alert alert-success" role="alert" id='alert-2'>
                Token SuccessFully Delivered; 
        </div>
        `
          );
          let alert2 = document.getElementById("alert-2");
          setTimeout(() => alert2.remove(), 3000);
        } else {
          card.insertAdjacentHTML(
            "beforebegin",
            `
        <div class="alert alert-danger" role="alert" id='alert-2'>
                Transaction Failed: ${r} 
        </div>
        `
          );
          let alert2 = document.getElementById("alert-2");
          setTimeout(() => alert2.remove(), 3000);
        }
        confirmBuyerBtn.innerHTML = "Received";
      });
    });
};

// metaMaskSection.addEventListener("click", (e1) => {

// });

window.addEventListener("load", async () => {
  getToken();
});
