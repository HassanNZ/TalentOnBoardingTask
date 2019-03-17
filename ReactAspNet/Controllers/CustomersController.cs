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

    public class CustomersController : Controller
    {
        private TalentEntity db = new TalentEntity();


        public ActionResult Index()
        {

            return View(db.Customers);
        }

        public JsonResult getCustomers()
        {
            var customer = db.Customers.Select(x => new { x.CustomerId, x.CustomerName, x.CustomerAddress }).ToList();

            return Json(customer, JsonRequestBehavior.AllowGet);
        }
        // GET: Customers/Details/5

        public JsonResult getCustomerInfo(int? id)
        {
            if (id == null)
            {
                return Json(" bad request !!!!", JsonRequestBehavior.AllowGet);
            }
            // Customer customer = db.Customers.Find(id);
            var customer = db.Customers.Where(x => x.CustomerId == id).Select(x => new { x.CustomerId, x.CustomerName, x.CustomerAddress }).ToList();
            if (customer == null)
            {
                return Json("There is no customer by this Id", JsonRequestBehavior.AllowGet);
            }
            return Json(customer, JsonRequestBehavior.AllowGet);
        }



        public ActionResult Edit([Bind(Include = "CustomerId,CustomerName,CustomerAddress")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                db.Entry(customer).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");

            }

            return RedirectToAction("Index");

        }





        public ActionResult Delete(int? id)
        {
            if (id != null)
            {

                Customer customer = db.Customers.Find(id);
                db.Customers.Remove(customer);
                db.SaveChanges();
                 return RedirectToAction("Index");
                 
            }
             return RedirectToAction("Index");
                 
        }

        public ActionResult Create([Bind(Include = "CustomerId,CustomerName,CustomerAddress")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                db.Customers.Add(customer);
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
