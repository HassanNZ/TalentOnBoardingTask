using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ReactAspNet;

namespace ReactAspNet.Controllers
{
    public class StoresController : Controller
    {
        private TalentEntity db = new TalentEntity();

        // GET: Stores
        public ActionResult Index()
        {
            return View(db.Stores.ToList());
        }
        public JsonResult getStores()
        {
            var store = db.Stores.Select(x =>  new  {x.StoreId, x.StoreName , x.StoreAddress }).ToList();

            return Json(store, JsonRequestBehavior.AllowGet);
        }


        public JsonResult getStoresInfo(int? id)
        {
            if (id == null)
            {
                return Json(" bad request !!!!", JsonRequestBehavior.AllowGet);
            }
            var store = db.Stores.Where(x => x.StoreId == id).Select(x => new { x.StoreId, x.StoreName, x.StoreAddress }).ToList();
            if (store == null)
            {
                return Json("There is no customer by this Id", JsonRequestBehavior.AllowGet);
            }
            return Json(store, JsonRequestBehavior.AllowGet);
        }





        public ActionResult Create([Bind(Include = "StoreId,StoreName,StoreAddress")] Store store)
        {
            if (ModelState.IsValid)
            {
                db.Stores.Add(store);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return RedirectToAction("Index");
        }



        public ActionResult Edit([Bind(Include = "StoreId,StoreName,StoreAddress")] Store store)
        {
            if (ModelState.IsValid)
            {
                db.Entry(store).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");

            }

            return RedirectToAction("Index");

        }





        public ActionResult Delete(int? id)
        {
            if (id != null)
            {
                Store store = db.Stores.Find(id);
                db.Stores.Remove(store);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
