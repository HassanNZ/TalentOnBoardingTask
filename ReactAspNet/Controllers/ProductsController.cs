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
    public class ProductsController : Controller
    {
        private TalentEntity db = new TalentEntity();

        // GET: Products
        public ActionResult Index()
        {
            return View(db.Products.ToList());
        }
        public JsonResult getProducts()
        {
            var product = db.Products.Select(x => new { x.ProductId, x.ProductName,x.ProductPrice }).ToList();

            return Json(product, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getProductInfo(int? id)
        {
            if (id == null)
            {
                return Json(" bad request !!!!", JsonRequestBehavior.AllowGet);
            }
            var product = db.Products.Where(x=> x.ProductId == id).Select(x => new { x.ProductId, x.ProductName, x.ProductPrice }).ToList();
            if (product == null)
            {
                return Json("There is no customer by this Id", JsonRequestBehavior.AllowGet);
            }
            return Json(product, JsonRequestBehavior.AllowGet);
        }






        public ActionResult Create([Bind(Include = "ProductId,ProductName,ProductPrice")] Product product)
        {
            if (ModelState.IsValid)
            {
                db.Products.Add(product);
            db.SaveChanges();
               //return Json("added11111", JsonRequestBehavior.AllowGet);
                return RedirectToAction("Index");
            }

            return RedirectToAction("Index");
        }



        public ActionResult Edit([Bind(Include = "ProductId,ProductName,ProductPrice")] Product product)
        {
            if (ModelState.IsValid)
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");

            }

            return RedirectToAction("Index");

        }





        public ActionResult Delete(int? id)
        {
            if (id != null)
            {
                Product product = db.Products.Find(id);
                db.Products.Remove(product);
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
