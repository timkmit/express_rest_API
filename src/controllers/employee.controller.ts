import express from 'express'
import { EmployeeModel } from '../db/employee.model';


class EmployeeController{
    getAllEmployees = async (req: express.Request, res: express.Response) => {
        try{
            const employees = await EmployeeModel.find();
            return res.status(200).json({data: employees})
        }catch (e){
            return res.sendStatus(400)
        }
    }

    getEmployee = async (req: express.Request, res: express.Response) => {
        try{
            const { id } = req.params
            const employee = await EmployeeModel.findById(id)
            return res.status(200).json({data: employee})
        }catch (e){
            return res.sendStatus(400)
        }
    }

    createEmployee = async (req: express.Request, res: express.Response) => {
        try{
            const { name, email, mobile, dob, doj } = req.body
            const employee = new EmployeeModel({
                name,
                email,
                mobile,
                dob,
                doj
            })
            await employee.save()
            return res.status(201).json({mes: "Employee has been sucsessfully created!", data: employee})
        }catch (e){
            return res.sendStatus(400)
        }
    }

    updateEmployee = async (req: express.Request, res: express.Response) => {
        try{
            const { id } = req.params
            const { name, email, mobile, dob, doj } = req.body
            const employee = await EmployeeModel.findById(id)
            if(employee){

                employee.name = name
                employee.email = email
                employee.mobile = mobile 
                employee.doj = doj
                employee.dob = dob

                await employee.save()
                return res.status(200).json({mes: "Employee has been sucsessfully updated!", data: employee}) 
            }
            return res.sendStatus(400)
        }catch (e){
            return res.sendStatus(400)
        }
    }

    deleteEmployee = async (req: express.Request, res: express.Response) => {
        try{
            const { id } = req.params
            await EmployeeModel.findByIdAndDelete({_id: id})
            return res.status(200).json({mes: "Employee is sucsesfully deleted!"})
        }catch (e){
            return res.sendStatus(400)
        }
    }
}

export default new EmployeeController()