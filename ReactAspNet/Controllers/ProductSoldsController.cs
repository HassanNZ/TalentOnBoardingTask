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
    public class ProductSoldsController : Controller
    {
        private TalentEntity db = new TalentEntity();

        // GET: ProductSolds1
        public ActionResult Index()
        {
            var productSolds = db.ProductSolds.Include(p => p.Customer).Include(p => p.Product).Include(p => p.Store);
            return View(productSolds.ToList());
        }

        public ActionResult GetProductSold()
        {

            var productSold = db.ProductSolds.Where(x => x.CustomerId == x.Customer.CustomerId && x.ProductId == x.Product.ProductId && x.StoreId == x.Store.StoreId)
                .Select(x => new { x.Id , x.DateSold, x.Customer.CustomerName, x.Product.ProductName, x.Store.StoreName}).ToList();

          return  Json(productSold, JsonRequestBehavior.AllowGet);
        }
        
        public ActionResult InfoProductSold(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var productSold = db.ProductSolds.Where(x => x.Id == id && x.CustomerId == x.Customer.CustomerId && x.ProductId == x.Product.ProductId && x.StoreId == x.Store.StoreId)
                .Select(x => new { x.Id,x.CustomerId,x.ProductId,x.StoreId ,x.DateSold, x.Customer.CustomerName, x.Product.ProductName, x.Store.StoreName }).ToList();
            if (productSold == null)
            {
                return HttpNotFound();
            }

            return Json(productSold, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetCustomers()
        {

            var customer = db.Customers.Select(x => new { x.CustomerId, x.CustomerName }).ToList();
            

            return Json(customer, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetProduct()
        {

            var product = db.Products.Select(x => new { x.ProductId, x.ProductName }).ToList();


            return Json(product, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetStore()
        {

            var store = db.Stores.Select(x => new { x.StoreId, x.StoreName }).ToList();


            return Json(store, JsonRequestBehavior.AllowGet);
        }
        // GET: ProductSolds1/Create
        //public ActionResult Create()
        //{
        //    ViewBag.CustomerId = new SelectList(db.Customers, "CustomerId", "CustomerName");
        //    ViewBag.ProductId = new SelectList(db.Products, "ProductId", "ProductName");
        //    ViewBag.StoreId = new SelectList(db.Stores, "StoreId", "StoreName");
        //    return View();
        //}

        // POST: ProductSolds1/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,CustomerId,ProductId,StoreId,DateSold")] ProductSold productSold)
        {
            if (ModelState.IsValid)
            {
                db.ProductSolds.Add(productSold);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            //ViewBag.CustomerId = new SelectList(db.Customers, "CustomerId", "CustomerName", productSold.CustomerId);
            //ViewBag.ProductId = new SelectList(db.Products, "ProductId", "ProductName", productSold.ProductId);
            //ViewBag.StoreId = new SelectList(db.Stores, "StoreId", "StoreName", productSold.StoreId);
            return RedirectToAction("Index");
        }

        //// GET: ProductSolds1/Edit/5
        //public ActionResult Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    ProductSold productSold = db.ProductSolds.Find(id);
        //    if (productSold == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    ViewBag.CustomerId = new SelectList(db.Customers, "CustomerId", "CustomerName", productSold.CustomerId);
        //    ViewBag.ProductId = new SelectList(db.Products, "ProductId", "ProductName", productSold.ProductId);
        //    ViewBag.StoreId = new SelectList(db.Stores, "StoreId", "StoreName", productSold.StoreId);
        //    return View(productSold);
        //}

        // POST: ProductSolds1/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,CustomerId,ProductId,StoreId,DateSold")] ProductSold productSold)
        {
            if (ModelState.IsValid)
            {
                db.Entry(productSold).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            //ViewBag.CustomerId = new SelectList(db.Customers, "CustomerId", "CustomerName", productSold.CustomerId);
            //ViewBag.ProductId = new SelectList(db.Products, "ProductId", "ProductName", productSold.ProductId);
            //ViewBag.StoreId = new SelectList(db.Stores, "StoreId", "StoreName", productSold.StoreId);
            return RedirectToAction("Index");
        }


        public ActionResult Delete(int id)
        {
            
            
            ProductSold productSold = db.ProductSolds.Find(id);
            if (productSold == null)
            {
                return HttpNotFound();
            }
            db.ProductSolds.Remove(productSold);
            db.SaveChanges();

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
